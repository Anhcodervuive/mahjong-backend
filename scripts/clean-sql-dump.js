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

  // 1. Remove \restrict
  if (trimmed.startsWith('\\restrict')) {
    continue;
  }

  // 2. Remove / comment out OWNER TO
  if (/^ALTER\s+.*\s+OWNER\s+TO\s+/i.test(trimmed)) {
    // Comment out or skip
    continue;
  }

  // 3. Remove schema owner changes if any
  if (/^ALTER\s+SCHEMA\s+.*\s+OWNER\s+TO\s+/i.test(trimmed)) {
    continue;
  }

  cleanedLines.push(line);
}

const result = cleanedLines.join('\n');
fs.writeFileSync(outputFile, result, 'utf8');
// Overwrite the original file too so if they re-upload the same file it works directly!
fs.writeFileSync(inputFile, result, 'utf8');

console.log(`Cleaned SQL dump saved successfully!`);
console.log(`Removed \\restrict and all OWNER TO statements.`);
console.log(`Total lines before: ${lines.length}, after: ${cleanedLines.length}`);
