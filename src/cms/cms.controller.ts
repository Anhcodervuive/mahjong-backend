import { Controller } from '@nestjs/common';

import { Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put('sections/reorder')
  async reorderSections(@Body('items') items: { id: number; order: number }[]) {
    return this.cmsService.reorderSections(items);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put('sections/:id')
  async updateSection(
    @Param('id') id: string,
    @Body('content') content: any,
  ) {
    return this.cmsService.updateSection(parseInt(id, 10), content);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put('pages/:slug/seo')
  async updatePageSeo(
    @Param('slug') slug: string,
    @Body() seoData: any,
  ) {
    return this.cmsService.updatePageSeo(slug, seoData);
  }

  @Get('rename-slug-temp')
  async renameSlugTemp() {
    return this.cmsService.renamePointsCalculatorSlug();
  }
}
