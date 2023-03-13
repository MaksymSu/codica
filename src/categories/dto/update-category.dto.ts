import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {
    @ApiProperty({example: '1', description: 'unique category id'})
    readonly id : number;

    @ApiProperty({example: 'Deposite', description: 'category name'})
    readonly name: string;
}