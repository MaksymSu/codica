import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({example: 'Food', description: 'name'})
    readonly name: string;
}