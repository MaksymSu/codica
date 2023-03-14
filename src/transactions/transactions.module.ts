import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksModule } from 'src/banks/banks.module';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transactions.model';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [TypeOrmModule.forFeature([Transaction]), BanksModule],
  exports: [TransactionsService]
})
export class TransactionsModule {}
