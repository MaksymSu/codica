import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Bank } from './banks.model';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';

@ApiTags('Banks')
@Controller('api')
export class BanksController {

    constructor(private banksService: BanksService) {}
    
    @ApiOperation({summary: 'Add new bank'})
    @ApiResponse({status: 201, type: Bank})
    @Post('banks')
    createBank(@Body() dto: CreateBankDto) {
        return this.banksService.create(dto);
    }
}


