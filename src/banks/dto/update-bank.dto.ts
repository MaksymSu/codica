import { ApiProperty } from "@nestjs/swagger";

export class UpdateBankDto {
    @ApiProperty({example: '1', description: 'unique bank id'})
    readonly id : number;

    @ApiProperty({example: 'Privatbank', description: 'bank name'})
    readonly name: string;

    @ApiProperty({example: '3000', description: 'balance in total'})
    readonly balance: number;
}