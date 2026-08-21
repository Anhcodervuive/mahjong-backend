const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'DATA', '2026-08-21', 'mahjong_test_db_backup.sql');
const outputFile = path.join(__dirname, '..', 'DATA', '2026-08-21', 'mahjong_test_db_backup_clean.sql');

if (!fs.existsSync(inputFile)) {
  console.error('File not found:', inputFile);
  process.exit(1);
}

const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

const cleanedLines = [];

for (let line of lines) {
  const trimmed = line.trim();

  // 1. Remove pg_dump restrictions
  if (trimmed.startsWith('\\restrict') || trimmed.startsWith('\\unrestrict')) {
    continue;
  }

  // 2. Remove OWNER TO statements
  if (/^ALTER\s+.*\s+OWNER\s+TO\s+/i.test(trimmed)) {
    continue;
  }

  // 3. Remove schema owner changes
  if (/^ALTER\s+SCHEMA\s+.*\s+OWNER\s+TO\s+/i.test(trimmed)) {
    continue;
  }

  // 4. Remove ALTER DEFAULT PRIVILEGES
  if (/^ALTER\s+DEFAULT\s+PRIVILEGES/i.test(trimmed)) {
    continue;
  }

  // 5. Remove GRANT / REVOKE statements
  if (/^(GRANT|REVOKE)\s+/i.test(trimmed)) {
    continue;
  }

  // 6. Remove any remaining neon-specific roles
  if (trimmed.includes('neon_superuser') || trimmed.includes('cloud_admin') || trimmed.includes('neondb_owner')) {
    // Only skip if it's a command (not just a comment)
    if (!trimmed.startsWith('--')) {
      continue;
    }
  }

  cleanedLines.push(line);
}

const result = cleanedLines.join('\n');
fs.writeFileSync(outputFile, result, 'utf8');
fs.writeFileSync(inputFile, result, 'utf8');

console.log(`Cleaned SQL dump saved successfully!`);
console.log(`Removed \\restrict, \\unrestrict, OWNER TO, ALTER DEFAULT PRIVILEGES, GRANT, REVOKE, and neon roles.`);
console.log(`Total lines before: ${lines.length}, after: ${cleanedLines.length}`);
