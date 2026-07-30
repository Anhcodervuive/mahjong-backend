import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';
import { BookingType } from '@prisma/client';

export class CreateGameDto {
  @IsEnum(BookingType)
  @IsOptional()
  type?: BookingType;
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  coverImageId?: number;

  @IsInt()
  @IsOptional()
  iconImageId?: number;

  @IsInt()
  @IsOptional()
  order?: number;
}
