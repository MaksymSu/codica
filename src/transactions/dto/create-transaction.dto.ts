import { ApiProperty } from "@nestjs/swagger";
import { Bank } from "src/banks/banks.model";
import { Category } from "src/categories/categories.model";

export class CreateTransactionDto {
    @ApiProperty({example: 1, description: 'Party bank id'})
    readonly partyId: number;

    @ApiProperty({example: 2, description: 'Couterparty bank id'})
    readonly couterpartyId: number;

    @ApiProperty({example: [1,2], description: 'Categories ids'})
    readonly categoriesIds: number[];
}