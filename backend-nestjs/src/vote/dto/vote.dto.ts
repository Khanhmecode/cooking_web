import { IsString, IsNotEmpty } from "class-validator";

export class VoteDTO {
  @IsNotEmpty()
  @IsString()
  email?: string

  @IsNotEmpty()
  @IsString()
  type: string

  @IsNotEmpty()
  categoryId: any
}