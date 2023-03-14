import { Body, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/categories.model';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transactions.model';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
      ) {}

    async create(dto: CreateTransactionDto): Promise<Transaction> {
        try {

            const transaction = this.transactionsRepository.create({
                party: {id: dto.partyId},
                counterparty: {id: dto.couterpartyId},
                categories: dto.categoriesIds.map(id => {return {id}})
            });    
            return await this.transactionsRepository.save(transaction);
        } catch (err) {
            throw new HttpException('db category creating error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
