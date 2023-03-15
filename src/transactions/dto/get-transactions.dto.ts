import {ApiProperty} from "@nestjs/swagger";

export class GetTransactionsDto {

    @ApiProperty({example: 'asc', description: 'Sort order', required: false})
    readonly order: string;

    @ApiProperty({example: 2, description: 'get from "offset" record', required: false})
    readonly offset: number;

    @ApiProperty({example: 3, description: 'get "limit" records', required: false})
    readonly limit: number;
}