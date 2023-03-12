import { ApiProperty } from "@nestjs/swagger";

export class CreateBankDto {
    @ApiProperty({example: 'Privatbank', description: 'bank name'})
    readonly name: string;

    @ApiProperty({example: '3000', description: 'balance in total'})
    readonly balance: number;
}