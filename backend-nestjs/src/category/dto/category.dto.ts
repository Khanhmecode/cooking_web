import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  thumbnail?: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsNotEmpty()
  email?: string;
}