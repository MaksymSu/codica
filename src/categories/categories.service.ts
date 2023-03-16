import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupBy } from 'rxjs';
import { Transaction } from 'src/transactions/transactions.model';
import { createQueryBuilder, In, LessThan, MoreThan, Repository } from 'typeorm';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
      ) {}

    async create(dto: CreateCategoryDto): Promise<Category> {
        try {
        const cat = this.categoriesRepository.create(dto);
        return await this.categoriesRepository.save(cat);
        } catch (err) {
            throw new HttpException('db category creating error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(dto: UpdateCategoryDto): Promise<Category> {
       try {
            let cat: Category;
            if (dto.id) {
                cat = await this.categoriesRepository.findOneByOrFail({id: dto.id});
                cat.name = dto.name;
            } else if (dto.name) {
                cat = await this.categoriesRepository.findOneByOrFail({name: dto.name});
            }

            return await this.categoriesRepository.save(cat); 
        } catch (err) {
            throw new HttpException('db category update error', HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number) {
        try {
            return await this.categoriesRepository.delete(id);
        } catch (err) {
            throw new HttpException('db category delete error', HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    async getOneById(id: number) {
        try {
            return await this.categoriesRepository.findOneByOrFail({id});
        } catch (err) {
            throw new HttpException('not found', HttpStatus.BAD_REQUEST)
        }
    }

    async getOneByName(name: string) {
        try {
            return await this.categoriesRepository.findOneByOrFail({name});
        } catch (err) {
            throw new HttpException('not found', HttpStatus.BAD_REQUEST)
        }
    }

    async getAll() {
        try {
            return await this.categoriesRepository.find();
        } catch (err) {
            throw new HttpException('not found', HttpStatus.BAD_REQUEST)
        }
    }

    async getTransactionsByCats(
        categoriesIds: number[], 
        fromPeriod: Date,
        toPeriod: Date,
        profitable: number = 0 
        ) {

        try {
            const res =  await this.categoriesRepository.createQueryBuilder()
            .leftJoinAndSelect("transaction-category", "tc", "tc.categoriesId = Category.id")
            .leftJoinAndSelect("transactions", "tr", "tc.transactionsId = tr.id")
            .select('SUM(tr.amount)', 'total')
            .addSelect('Category.name', 'name')
            .addSelect('Category.id', 'id')
            .groupBy('Category.id')
            .where({
                id: In(categoriesIds)
            })
            .andWhere(`tr.createdAt <= '${toPeriod}'`)
            .andWhere(`tr.createdAt >= '${fromPeriod}'`)
            //.andWhere(`tr.type = ${profitable}`);
            switch (profitable) {
                case 1: return res.andWhere('tr.type = true').getRawMany();
                case 2: return res.andWhere('tr.type = false').getRawMany();
            }

            return res.getRawMany();
        } catch (err) {
            throw new HttpException('wrong query', HttpStatus.BAD_REQUEST)
        }
    }
    
}

