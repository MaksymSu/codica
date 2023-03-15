import { Injectable } from '@nestjs/common';
import { BanksService } from 'src/banks/banks.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { GetStatisticsDto } from './dto/get-statistics.dto';

@Injectable()
export class StatisticsService {
    constructor(
        private banksService: BanksService,
        private transactionService: TransactionsService
      ) {}

      async getStats(dto: GetStatisticsDto) {
        return 'ok';
      }
}
