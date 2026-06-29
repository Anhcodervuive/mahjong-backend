import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateGameDto {
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
}
