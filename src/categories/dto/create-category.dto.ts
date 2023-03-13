import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({example: 'Deposite', description: 'name'})
    readonly name: string;
}