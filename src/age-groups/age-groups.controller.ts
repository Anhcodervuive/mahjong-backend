import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AgeGroupsService } from './age-groups.service';

@Controller('age-groups')
export class AgeGroupsController {
  constructor(private readonly ageGroupsService: AgeGroupsService) {}

  @Post()
  create(@Body() data: { name: string }) {
    return this.ageGroupsService.create(data);
  }

  @Get()
  findAll() {
    return this.ageGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ageGroupsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: { name: string }) {
    return this.ageGroupsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ageGroupsService.remove(id);
  }
}
