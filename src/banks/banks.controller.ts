import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Bank } from './banks.model';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

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

    @ApiOperation({summary: 'Update bank by id or name'})
    @ApiResponse({status: 200, type: Bank})
    @Put('banks')
    updateBank(@Body() dto: UpdateBankDto) {
        return this.banksService.update(dto);
    }

    @ApiOperation({summary: 'Delete bank'})
    @ApiResponse({status: 200, type: Bank})
    @Delete('/banks/:id')
    delete(@Param('id') id: number) {
        return this.banksService.delete(id);
    }
}


