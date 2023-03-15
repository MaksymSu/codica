import { Injectable } from '@nestjs/common';
import { BanksService } from 'src/banks/banks.service';
import { CategoriesService } from 'src/categories/categories.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { GetStatisticsDto } from './dto/get-statistics.dto';

@Injectable()
export class StatisticsService {
    constructor(
        private banksService: BanksService,
        private categoriesService: CategoriesService,
        private transactionService: TransactionsService
    ) {}

    async getStats(dto: GetStatisticsDto) {
        return this.categoriesService.getTransactionsByCats(dto.categoriesIds)
    }
}
