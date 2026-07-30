import { IsString, IsOptional, IsInt, IsNumber, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingType } from '@prisma/client';

class ServiceOptionPriceDto {
  @IsInt()
  serviceOptionId: number;

  @IsNumber()
  price: number;
}

export class CreateSessionDto {
  @IsEnum(BookingType)
  @IsOptional()
  type?: BookingType;
  @IsInt()
  categoryId: number;

  @IsInt()
  @IsOptional()
  parentId?: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  pricePerPerson: number;

  @IsInt()
  duration: number;

  @IsInt()
  minPlayers: number;

  @IsInt()
  maxPlayers: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceOptionPriceDto)
  @IsOptional()
  serviceOptions?: ServiceOptionPriceDto[];

  @IsInt()
  @IsOptional()
  order?: number;
}
