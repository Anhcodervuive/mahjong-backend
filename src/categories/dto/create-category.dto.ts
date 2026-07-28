import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCategoryDto {
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
