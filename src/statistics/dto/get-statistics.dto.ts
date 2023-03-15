import { ApiProperty } from "@nestjs/swagger";

export class GetStatisticsDto {
    @ApiProperty({example: [1,2,3], description: 'categoies ids'})
    readonly categoriesIds: number[];

    @ApiProperty({example: '2023-03-13 09:12:57', description: 'From date'})
    readonly fromPeriod: Date;

    @ApiProperty({example: '2023-03-14 09:12:57', description: 'To date'})
    readonly toPeriod: Date;
}