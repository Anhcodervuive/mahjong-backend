import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';
import { BookingType } from '@prisma/client';

export class CreateCategoryDto {
  @IsEnum(BookingType)
  @IsOptional()
  type?: BookingType;
  @IsInt()
  gameId: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  order?: number;
}
