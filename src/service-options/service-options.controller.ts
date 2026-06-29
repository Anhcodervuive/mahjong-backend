import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ServiceOptionsService } from './service-options.service';

@Controller('service-options')
export class ServiceOptionsController {
  constructor(private readonly serviceOptionsService: ServiceOptionsService) {}

  @Post()
  create(@Body() data: { name: string; description?: string; price: number }) {
    return this.serviceOptionsService.create(data);
  }

  @Get()
  findAll() {
    return this.serviceOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviceOptionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: { name?: string; description?: string; price?: number }) {
    return this.serviceOptionsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviceOptionsService.remove(id);
  }
}
