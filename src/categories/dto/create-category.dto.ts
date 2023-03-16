import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: 'Food', description: 'name'})
    @IsString({message: 'string is expected'})
    readonly name: string;
}