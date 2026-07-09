import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private prisma: PrismaService) {}

  async getSetting(key: string) {
    try {
      const setting = await this.prisma.setting.findUnique({
        where: { key },
      });
      return setting ? setting.value : null;
    } catch (error) {
      this.logger.error(`Failed to get setting ${key}`, error);
      throw new InternalServerErrorException('Failed to get setting');
    }
  }

  async setSetting(key: string, value: string) {
    try {
      const setting = await this.prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
      return setting;
    } catch (error) {
      this.logger.error(`Failed to set setting ${key}`, error);
      throw new InternalServerErrorException('Failed to set setting');
    }
  }
}
