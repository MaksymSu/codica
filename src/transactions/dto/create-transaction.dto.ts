import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsBoolean, IsNumber } from "class-validator";

export class CreateTransactionDto {

    @ApiProperty({example: true, description: 'true - profitable,  false - consumable', required: true})
    @IsBoolean({message: 'boolean is expected'})
    readonly type: boolean;

    @ApiProperty({example: 700, description: 'amount', required: true })
    @IsNumber({}, {message: 'number is expected'})
    readonly amount: number;

    @ApiProperty({example: 1, description: 'Bank id', required: true})
    @IsNumber({}, {message: 'number is expected'})
    readonly bankId: number;

    @ApiProperty({example: [1,2], description: 'Categories ids', required: true, isArray: true})
    @IsArray({message: 'array of numbers is expected'})
    @ArrayMinSize(1)
    readonly categoriesIds: number[];
}