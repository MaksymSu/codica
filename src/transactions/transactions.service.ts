import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BanksService } from 'src/banks/banks.service';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transactions.model';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        private banksService: BanksService
      ) {}

    async create(dto: CreateTransactionDto): Promise<Transaction> {
        try {
            const transaction = this.transactionsRepository.create({
                type: dto.type,
                amount: dto.amount,
                bank: {id: dto.bankId},
                categories: dto.categoriesIds.map(id => {return {id}})
            });

            const bank = await this.banksService.getOneById(dto.bankId);
            await this.banksService.update({
                id: dto.bankId,
                name: bank.name,
                balance: dto.type ? bank.balance + dto.amount : bank.balance - dto.amount
            });

            return await this.transactionsRepository.save(transaction);
        } catch (err) {
            throw new HttpException(err.detail, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number) {
        try {
            const transaction = await this.transactionsRepository.findOneOrFail({relations: ['bank'], where: {id}} );
            await this.banksService.update({
                id: transaction.bank.id,
                name: transaction.bank.name,
                balance: !transaction.type ? transaction.bank.balance + transaction.amount
                 : transaction.bank.balance - transaction.amount
            });


            return await this.transactionsRepository.delete(id);
        } catch (err) {
            throw new HttpException('db transaction delete error', HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    async getAll() {
        try {
            return await this.transactionsRepository.find({ relations: ['categories', 'bank'] });
        } catch (err) {
            throw new HttpException(err.details, HttpStatus.BAD_REQUEST)
        }
    }

}
