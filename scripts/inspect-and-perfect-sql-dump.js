const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'DATA', '2026-08-21', 'mahjong_test_db_backup.sql');
const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);

const suspectLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  // Check for PostgreSQL 17+ specific params
  if (trimmed.includes('transaction_timeout')) {
    suspectLines.push({ lineNum: i + 1, type: 'PG17_CONFIG', content: line });
  }

  // Check for any OWNER statements
  if (/OWNER\s+TO/i.test(trimmed)) {
    suspectLines.push({ lineNum: i + 1, type: 'OWNER_STATEMENT', content: line });
  }

  // Check for any GRANT / REVOKE
  if (/^(GRANT|REVOKE)\s+/i.test(trimmed)) {
    suspectLines.push({ lineNum: i + 1, type: 'GRANT_REVOKE', content: line });
  }

  // Check for neon/cloud roles
  if (/neon_superuser|cloud_admin|neondb_owner/i.test(trimmed) && !trimmed.startsWith('--')) {
    suspectLines.push({ lineNum: i + 1, type: 'NEON_ROLE', content: line });
  }

  // Check for restrict / unrestrict
  if (trimmed.startsWith('\\restrict') || trimmed.startsWith('\\unrestrict')) {
    suspectLines.push({ lineNum: i + 1, type: 'RESTRICT_MACRO', content: line });
  }

  // Check for CREATE EXTENSION or COMMENT ON EXTENSION
  if (/EXTENSION/i.test(trimmed)) {
    suspectLines.push({ lineNum: i + 1, type: 'EXTENSION', content: line });
  }

  // Check for SCHEMA ownership or permissions
  if (/SCHEMA\s+public/i.test(trimmed) && !trimmed.startsWith('--') && !trimmed.startsWith('SELECT') && !trimmed.includes('public.')) {
    suspectLines.push({ lineNum: i + 1, type: 'SCHEMA_MGMT', content: line });
  }

  // Check for tablespace
  if (/TABLESPACE/i.test(trimmed) && !trimmed.startsWith('--')) {
    suspectLines.push({ lineNum: i + 1, type: 'TABLESPACE', content: line });
  }
}

console.log('Suspect lines found:', suspectLines.length);
console.log(JSON.stringify(suspectLines, null, 2));
