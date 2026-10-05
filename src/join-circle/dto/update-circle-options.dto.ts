import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCircleOptionsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  days?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  times?: string[];

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  flatFee?: number;
}
