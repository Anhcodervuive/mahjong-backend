import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

async function runBackup() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ Error: DATABASE_URL is not defined in the environment.');
    process.exit(1);
  }

  // Obfuscate credentials for safe logging
  const safeDbUrl = dbUrl.replace(/:([^@]+)@/, ':****@');
  console.log('🔄 Starting Database Backup...');
  console.log(`📡 Connecting to: ${safeDbUrl}`);

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });

  try {
    // 1. Get current date for folder name: YYYY-MM-DD
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateFolder = `${year}-${month}-${day}`;
    const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;

    const targetDir = path.join(__dirname, '..', 'DATA', dateFolder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`📁 Backup Destination: DATA/${dateFolder}`);

    // 2. Discover all tables in the public schema
    const rawTables: Array<{ table_name: string }> = await prisma.$queryRawUnsafe(`
      SELECT tablename as table_name 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);

    const tableNames = rawTables.map((t) => t.table_name);
    console.log(`📋 Found ${tableNames.length} tables in public schema.`);

    // Desired insertion order to minimize foreign key constraint issues
    const preferredOrder = [
      'Setting',
      'User',
      'Media',
      'CircleOption',
      'Game',
      'Location',
      'AgeGroup',
      'SessionCategory',
      'Session',
      'ServiceOption',
      'SessionAvailability',
      'Booking',
      'Participant',
      'EventContact',
      'CmsPage',
      'CmsSection',
      '_prisma_migrations',
    ];

    const sortedTables = [
      ...preferredOrder.filter((t) => tableNames.includes(t)),
      ...tableNames.filter((t) => !preferredOrder.includes(t)),
    ];

    const sqlStatements: string[] = [
      '-- =========================================================================',
      `-- MAHJONG DATABASE FULL BACKUP`,
      `-- Date: ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      `-- Target Database: ${safeDbUrl}`,
      `-- Total Tables: ${sortedTables.length}`,
      '-- Compatible with PostgreSQL on cPanel / phpPgAdmin / psql / Neon',
      '-- =========================================================================\n',
      '-- Disable foreign key constraints during data import',
      "SET session_replication_role = 'replica';\n",
    ];

    const jsonDump: Record<string, any[]> = {};
    const tableSummaries: Array<{ name: string; count: number }> = [];

    // 3. Dump each table's data
    for (const tableName of sortedTables) {
      process.stdout.write(`⏳ Backing up table: "${tableName}"... `);

      // Check if table has 'id' column for ordering
      const colCheck: Array<{ column_name: string }> = await prisma.$queryRawUnsafe(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = '${tableName}' 
          AND column_name = 'id';
      `);

      const orderClause = colCheck.length > 0 ? 'ORDER BY "id" ASC' : '';
      const rows: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM public."${tableName}" ${orderClause};`
      );

      jsonDump[tableName] = rows;
      tableSummaries.push({ name: tableName, count: rows.length });
      console.log(`${rows.length} rows`);

      if (rows.length === 0) {
        sqlStatements.push(`-- Table: public."${tableName}" (0 rows)\n`);
        continue;
      }

      sqlStatements.push(`-- ──────────────────────────────────────────────────────────`);
      sqlStatements.push(`-- Data for Name: public."${tableName}" (${rows.length} rows)`);
      sqlStatements.push(`-- ──────────────────────────────────────────────────────────`);

      // Clean existing data before insert (optional safe truncate)
      sqlStatements.push(`-- TRUNCATE TABLE public."${tableName}" CASCADE;`);

      const columns = Object.keys(rows[0]);
      const quotedCols = columns.map((c) => `"${c}"`).join(', ');

      for (const row of rows) {
        const values = columns.map((col) => {
          const val = row[col];
          if (val === null || val === undefined) return 'NULL';
          if (typeof val === 'boolean') return val ? 'true' : 'false';
          if (typeof val === 'number') return String(val);
          if (val instanceof Date) return `'${val.toISOString()}'`;
          if (typeof val === 'object') {
            return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
          }
          // String
          return `'${String(val).replace(/'/g, "''")}'`;
        });

        sqlStatements.push(
          `INSERT INTO public."${tableName}" (${quotedCols}) VALUES (${values.join(', ')});`
        );
      }

      // Reset auto-increment sequence if id column exists
      if (colCheck.length > 0) {
        sqlStatements.push(
          `SELECT setval(pg_get_serial_sequence('public."${tableName}"', 'id'), COALESCE((SELECT MAX("id") FROM public."${tableName}"), 1), (SELECT COUNT(*) > 0 FROM public."${tableName}"));\n`
        );
      } else {
        sqlStatements.push('');
      }
    }

    // Re-enable foreign key constraints
    sqlStatements.push('-- Re-enable foreign key constraints');
    sqlStatements.push("SET session_replication_role = 'origin';\n");

    // 4. Write SQL dump files
    const mainSqlFile = path.join(targetDir, `mahjong_prod_backup.sql`);
    const timestampSqlFile = path.join(targetDir, `mahjong_prod_backup_${timestamp}.sql`);
    const jsonFile = path.join(targetDir, `mahjong_prod_backup.json`);
    const summaryFile = path.join(targetDir, `BACKUP_INFO.md`);

    const fullSql = sqlStatements.join('\n');
    fs.writeFileSync(mainSqlFile, fullSql, 'utf8');
    fs.writeFileSync(timestampSqlFile, fullSql, 'utf8');
    fs.writeFileSync(jsonFile, JSON.stringify(jsonDump, null, 2), 'utf8');

    // 5. Generate BACKUP_INFO.md in the folder
    const summaryMd = [
      `# Database Backup Summary (${year}-${month}-${day})`,
      ``,
      `- **Generated At:** ${year}-${month}-${day} ${hours}:${minutes}:${seconds} (Local Time)`,
      `- **Database Host:** ${safeDbUrl}`,
      `- **SQL Dump Files:**`,
      `  - \`${path.basename(mainSqlFile)}\` (Latest standard dump for phpPgAdmin / psql)`,
      `  - \`${path.basename(timestampSqlFile)}\` (Timestamped snapshot)`,
      `- **JSON Dump File:** \`${path.basename(jsonFile)}\``,
      ``,
      `## 📊 Table Row Counts`,
      ``,
      `| Table Name | Row Count |`,
      `| :--- | :---: |`,
      ...tableSummaries.map((t) => `| \`${t.name}\` | ${t.count} |`),
      ``,
      `## 🔄 How to Restore this Backup`,
      ``,
      `### Option 1: Via phpPgAdmin (cPanel)`,
      `1. Open **phpPgAdmin** on cPanel.`,
      `2. Select the target database.`,
      `3. Open the **SQL** tab.`,
      `4. Copy and paste the contents of \`${path.basename(mainSqlFile)}\` and click **Execute**.`,
      ``,
      `### Option 2: Via psql command`,
      `\`\`\`bash`,
      `psql -d "<DATABASE_URL>" -f "${path.relative(process.cwd(), mainSqlFile)}"`,
      `\`\`\``,
    ].join('\n');

    fs.writeFileSync(summaryFile, summaryMd, 'utf8');

    console.log('\n============================================================');
    console.log('✅ BACKUP COMPLETED SUCCESSFULLY!');
    console.log(`📁 Target Directory: DATA/${dateFolder}`);
    console.log(`📄 SQL File:         ${path.basename(mainSqlFile)} (${(fullSql.length / 1024).toFixed(2)} KB)`);
    console.log(`📄 Timestamp File:   ${path.basename(timestampSqlFile)}`);
    console.log(`📄 JSON File:        ${path.basename(jsonFile)}`);
    console.log(`📄 Summary Info:     ${path.basename(summaryFile)}`);
    console.log('============================================================\n');
  } catch (error) {
    console.error('❌ Backup failed with error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runBackup();
