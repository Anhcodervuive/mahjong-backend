import { Controller } from '@nestjs/common';

import { Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('pages')
  async getAllPages() {
    return this.cmsService.getAllPages();
  }

  @Get('pages/:slug')
  async getPageBySlug(@Param('slug') slug: string) {
    return this.cmsService.getPageBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Put('sections/:id')
  async updateSection(
    @Param('id') id: string,
    @Body('value') value: string,
  ) {
    return this.cmsService.updateSection(parseInt(id, 10), value);
  }
}
