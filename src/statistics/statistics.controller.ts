import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetStatisticsDto } from "./dto/get-statistics.dto";
import { StatisticsService } from "./statistics.service";

class Statistics {

}

@ApiTags('Statistics')
@Controller('api')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService) {}
    
    @ApiOperation({summary: 'Add new transaction'})
    @ApiResponse({status: 201, type: Statistics})
    @Post('statistics')
    createCategory(@Body() dto: GetStatisticsDto) {
        return this.statisticsService.getStats(dto);
    }

}