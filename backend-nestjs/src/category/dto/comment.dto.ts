import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CommentDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  email?: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}