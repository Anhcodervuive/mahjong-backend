const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'DATA', '2026-08-21');
const sourceFile = path.join(dir, 'mahjong_test_db_backup.sql');
const cleanPsqlFile = path.join(dir, 'mahjong_cpanel_psql.sql');
const insertsFile = path.join(dir, 'mahjong_cpanel_inserts.sql');

if (!fs.existsSync(sourceFile)) {
  console.error('Source file not found:', sourceFile);
  process.exit(1);
}

const content = fs.readFileSync(sourceFile, 'utf8');
const lines = content.split('\n');

// 1. Generate Clean PSQL File
const cleanPsqlLines = [];
let inCopy = false;

for (let line of lines) {
  const trimmed = line.trim();

  // Remove Postgres 17+ or client-specific commands
  if (trimmed.startsWith('\\restrict') || trimmed.startsWith('\\unrestrict')) continue;
  if (trimmed.startsWith('SET transaction_timeout')) continue;

  // Remove owner / permissions / roles
  if (/^ALTER\s+.*\s+OWNER\s+TO\s+/i.test(trimmed)) continue;
  if (/^ALTER\s+SCHEMA\s+.*\s+OWNER\s+TO\s+/i.test(trimmed)) continue;
  if (/^ALTER\s+DEFAULT\s+PRIVILEGES/i.test(trimmed)) continue;
  if (/^(GRANT|REVOKE)\s+/i.test(trimmed)) continue;
  if ((trimmed.includes('neon_superuser') || trimmed.includes('cloud_admin') || trimmed.includes('neondb_owner')) && !trimmed.startsWith('--')) continue;

  cleanPsqlLines.push(line);
}

const cleanPsqlContent = cleanPsqlLines.join('\n');
fs.writeFileSync(cleanPsqlFile, cleanPsqlContent, 'utf8');
// Also overwrite original file to ensure direct use works
fs.writeFileSync(sourceFile, cleanPsqlContent, 'utf8');
fs.writeFileSync(path.join(dir, 'mahjong_test_db_backup_clean.sql'), cleanPsqlContent, 'utf8');

console.log('Saved clean PSQL dump:', cleanPsqlFile);

// 2. Generate SQL file with INSERT statements (for phpPgAdmin / Web UI compatibility)
// Let's convert COPY blocks to INSERT statements
const insertSqlLines = [];
let currentTable = null;
let currentColumns = [];
let copying = false;

for (let line of cleanPsqlLines) {
  const trimmed = line.trim();

  // Detect COPY start
  const copyMatch = line.match(/^COPY\s+public\."([^"]+)"\s*\(([^)]+)\)\s*FROM\s*stdin;/i);
  if (copyMatch) {
    copying = true;
    currentTable = copyMatch[1];
    currentColumns = copyMatch[2].split(',').map(c => c.trim());
    insertSqlLines.push(`-- Data for Name: ${currentTable}`);
    continue;
  }

  if (copying) {
    if (trimmed === '\\.') {
      copying = false;
      currentTable = null;
      currentColumns = [];
      insertSqlLines.push('');
      continue;
    }

    if (!trimmed) continue;

    // Parse tab-separated values from COPY stdin
    const rawValues = line.split('\t');
    const escapedValues = rawValues.map((val) => {
      if (val === '\\N') return 'NULL';
      // Unescape PostgreSQL copy format
      let str = val;
      str = str.replace(/\\n/g, '\n')
               .replace(/\\r/g, '\r')
               .replace(/\\t/g, '\t')
               .replace(/\\\\/g, '\\');
      // Escape SQL string
      return `'${str.replace(/'/g, "''")}'`;
    });

    const colList = currentColumns.join(', ');
    const valList = escapedValues.join(', ');
    insertSqlLines.push(`INSERT INTO public."${currentTable}" (${colList}) VALUES (${valList});`);
    continue;
  }

  insertSqlLines.push(line);
}

fs.writeFileSync(insertsFile, insertSqlLines.join('\n'), 'utf8');
console.log('Saved clean INSERT dump (for phpPgAdmin / Web UI):', insertsFile);
