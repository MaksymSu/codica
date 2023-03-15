import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksModule } from 'src/banks/banks.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [TypeOrmModule.forFeature([StatisticsModule]), BanksModule, TransactionsModule, CategoriesModule],
  exports: [StatisticsService]
})
export class StatisticsModule {}
