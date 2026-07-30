import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateJoinCircleDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsInt()
  @IsNotEmpty()
  gameId: number;

  @IsInt()
  @IsOptional()
  locationId?: number;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsString()
  @IsNotEmpty()
  ageGroup: string;

  @IsArray()
  @IsString({ each: true })
  days: string[];

  @IsArray()
  @IsString({ each: true })
  times: string[];

  @IsString()
  @IsNotEmpty()
  groupSize: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  friendEmail?: string;

  @IsString()
  @IsOptional()
  friendPhone?: string;
}
