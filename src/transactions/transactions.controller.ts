import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
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
}
