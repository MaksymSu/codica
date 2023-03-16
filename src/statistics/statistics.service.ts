import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { GetStatisticsDto } from './dto/get-statistics.dto';

@Injectable()
export class StatisticsService {
    constructor(
        private categoriesService: CategoriesService,
    ) {}

    async getStats(dto: GetStatisticsDto) {
        if (process.env.TRANSACTION_PROFITABLE_BY_TYPE_FIELD === 'false') {
            const result  = await this.categoriesService.getTransactionsByCats(dto.categoriesIds, dto.fromPeriod, dto.toPeriod);
            return result.map( cat => {return {[cat.name]: cat.total}});
        }

        if (process.env.TRANSACTION_PROFITABLE_BY_TYPE_FIELD === 'true') {
            
            let [pluses, minuses] = await Promise.all([
              this.categoriesService.getTransactionsByCats(dto.categoriesIds, dto.fromPeriod, dto.toPeriod, 1),
              this.categoriesService.getTransactionsByCats(dto.categoriesIds, dto.fromPeriod, dto.toPeriod, 2)
            ]);
            
            return this.getBalance(pluses, minuses); 
        }
    }

    private getBalance(pluses: any, minuses: any) {
        interface Category {
            id: number;
            name: string;
            total: string;
          }
          
          interface CategoryData {
            profit?: number;
            expense?: number;
          }
          
          interface CategoryData {
            profit?: number;
            expense?: number;
          }
          
          const categories: { [name: string]: CategoryData } = {};
          
          pluses.forEach(({ name, total }) => {
            categories[name] = { profit: Number(total) };
          });
          
          minuses.forEach(({ name, total }) => {
            if (categories[name]) {
              categories[name].expense = Number(total);
            } else {
              categories[name] = { expense: Number(total) };
            }
          });
          
          const result = Object.entries(categories).map(([name, { profit = 0, expense = 0 }]) => ({
            [name]: profit - expense,
          }));
          
          return result;
    }
}
