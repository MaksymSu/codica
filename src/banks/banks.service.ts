import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './banks.model';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BanksService {
    constructor(
        @InjectRepository(Bank)
        private banksRepository: Repository<Bank>,
      ) {}

    async create(dto: CreateBankDto): Promise<Bank> {
        try {
        const bank = this.banksRepository.create(dto);
        return await this.banksRepository.save(bank);
        } catch (err) {
            throw new HttpException('db bank creating error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(dto: UpdateBankDto): Promise<Bank> {
       try {
            let bank: Bank;
            if (dto.id) {
                bank = await this.banksRepository.findOneByOrFail({id: dto.id});
                bank.name = dto.name;
                bank.balance = dto.balance;
            } else if (dto.name) {
                bank = await this.banksRepository.findOneByOrFail({name: dto.name});
                bank.balance = dto.balance;
            }

            return await this.banksRepository.save(bank); 
        } catch (err) {
            throw new HttpException('db bank update error', HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number) {
        try {
            return await this.banksRepository.delete(id);
        } catch (err) {
            throw new HttpException('db bank delete error', HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    async getOneById(id: number) {
        try {
            return await this.banksRepository.findOneByOrFail({id});
        } catch (err) {
            throw new HttpException('not found', HttpStatus.BAD_REQUEST)
        }
    }

    async getOneByName(name: string) {
        try {
            return await this.banksRepository.findOneByOrFail({name});
        } catch (err) {
            throw new HttpException('not found', HttpStatus.BAD_REQUEST)
        }
    }

    async getAll() {
        try {
            return await this.banksRepository.find();
        } catch (err) {
            throw new HttpException('not found', HttpStatus.BAD_REQUEST)
        }
    }
    
}
