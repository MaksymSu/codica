import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BanksModule } from './banks/banks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './banks/banks.model';
import { DataSource } from 'typeorm';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/categories.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Bank, Category],
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),

    BanksModule,

    CategoriesModule
  ],

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

