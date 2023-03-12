import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './banks.model';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class BanksService {
    constructor(
        @InjectRepository(Bank)
        private banksRepository: Repository<Bank>,
      ) {}

    async create(dto: CreateBankDto)  {
        try {
        const bank = this.banksRepository.create(dto);
        console.log(bank);
        return await this.banksRepository.save(bank);
        } catch (err) {
            throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
        }
    }
    
}
