import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksController } from './banks.controller';
import { Bank } from './banks.model';
import { BanksService } from './banks.service';

@Module({
  controllers: [BanksController],
  providers: [BanksService],
  imports: [TypeOrmModule.forFeature([Bank])],
  exports: [BanksService]
})
export class BanksModule {}
