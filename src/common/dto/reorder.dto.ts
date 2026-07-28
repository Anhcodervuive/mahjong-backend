import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

export class ReorderDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  itemIds: number[];
}
