import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateBankDto {
    @ApiProperty({example: 'Privatbank', description: 'bank name'})
    @IsString({message: 'string is expected'})
    readonly name: string;

    @ApiProperty({example: '3000', description: 'balance in total'})
    @IsNumber({}, {message: 'number is expected'})
    readonly balance: number;
}