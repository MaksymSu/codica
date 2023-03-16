import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateCategoryDto {
    @ApiProperty({example: '1', description: 'unique category id'})
    @IsNumber({}, {message: 'number is expected'})
    readonly id : number;

    @ApiProperty({example: 'Food', description: 'category name'})
    @IsString({message: 'string is expected'})
    readonly name: string;
}