import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsDateString, MinLength } from "class-validator";

export class GetStatisticsDto {
    @ApiProperty({example: [1,2,3], description: 'categoies ids'})
    @IsArray({message: 'array of numbers is expected'})
    @ArrayMinSize(1)
    readonly categoriesIds: number[];

    @ApiProperty({example: '2022-03-13 09:12:57', description: 'From date'})
    @IsDateString()
    readonly fromPeriod: Date;

    @ApiProperty({example: () => "CURRENT_TIMESTAMP(6)", description: 'To date'})
    @IsDateString()
    readonly toPeriod: Date;
}