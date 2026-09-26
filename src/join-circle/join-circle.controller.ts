import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Patch } from '@nestjs/common';
import { JoinCircleService } from './join-circle.service';
import { CreateJoinCircleDto } from './dto/create-join-circle.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('join-circle')
export class JoinCircleController {
  constructor(private readonly joinCircleService: JoinCircleService) {}

  @Post()
  create(@Body() createJoinCircleDto: CreateJoinCircleDto) {
    return this.joinCircleService.create(createJoinCircleDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.joinCircleService.findAll();
  }

  @Get('options')
  getOptions() {
    return this.joinCircleService.getOptions();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put('options')
  updateOptions(@Body() dto: { days?: string[]; times?: string[] }) {
    return this.joinCircleService.updateOptions(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.joinCircleService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.joinCircleService.updateStatus(+id, status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.joinCircleService.remove(+id);
  }
}
