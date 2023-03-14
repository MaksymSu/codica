import { ApiProperty } from "@nestjs/swagger";
import { Bank } from "src/banks/banks.model";
import { Category } from "src/categories/categories.model";

export class CreateTransactionDto {

    @ApiProperty({example: true, description: 'true - profitable,  false - consumable'})
    readonly type: boolean;

    @ApiProperty({example: 700, description: 'amount'})
    readonly amount: number;

    @ApiProperty({example: 1, description: 'Bank id'})
    readonly bankId: number;

    @ApiProperty({example: [1,2], description: 'Categories ids'})
    readonly categoriesIds: number[];
}