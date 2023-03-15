import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { Transaction } from './transactions.model';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@Controller('api')
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}
    
    @ApiOperation({summary: 'Add new transaction'})
    @ApiResponse({status: 201, type: Transaction})
    @Post('transactions')
    createCategory(@Body() dto: CreateTransactionDto) {
        return this.transactionsService.create(dto);
    }

    @ApiOperation({summary: 'Delete transaction'})
    @ApiResponse({status: 200, type: Transaction})
    @Delete('/transactions/:id')
    delete(@Param('id') id: number) {
        return this.transactionsService.delete(id);
    }

    @ApiOperation({summary: 'Get all transactions'})
    @ApiResponse({status: 200, type: [Transaction]})
    @Get('/transactions')
    getAll(@Query() params: GetTransactionsDto) {
        return this.transactionsService.getAll(params);
    }
}
