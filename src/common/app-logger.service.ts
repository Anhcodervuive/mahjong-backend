import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  private logFilePath: string | null = null;

  constructor(context?: string) {
    super(context || 'App');
    this.initLogFile();
  }

  private initLogFile() {
    const candidatePaths = [
      process.env.LOG_FILE_PATH,
      '/home/d12972/logs/backend.log',
      path.join(process.cwd(), 'logs', 'backend.log'),
    ].filter(Boolean) as string[];

    for (const p of candidatePaths) {
      try {
        const dir = path.dirname(p);
        if (fs.existsSync(dir)) {
          this.logFilePath = p;
          break;
        }
      } catch {
        // Ignore file system check errors
      }
    }
  }

  private writeToFile(level: string, message: any, context?: string, trace?: string) {
    if (!this.logFilePath) return;

    try {
      const now = new Date();
      const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
      const ctx = context ? `[${context}]` : '';
      const msgStr = typeof message === 'object' ? JSON.stringify(message) : String(message);
      let line = `[${timestamp}] [${level.toUpperCase()}] ${ctx} ${msgStr}\n`;
      if (trace) {
        line += `${trace}\n`;
      }
      fs.appendFileSync(this.logFilePath, line, 'utf8');
    } catch {
      // Fallback silently if file cannot be written
    }
  }

  log(message: any, context?: string) {
    super.log(message, context);
    this.writeToFile('INFO', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
    this.writeToFile('ERROR', message, context, trace);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    this.writeToFile('WARN', message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    this.writeToFile('DEBUG', message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
    this.writeToFile('VERBOSE', message, context);
  }
}
