import { ApiProperty } from "@nestjs/swagger";
import { Transaction } from "src/transactions/transactions.model";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
 
@Entity('categories')
export class Category {
    @ApiProperty({example: '33', description: 'unique id'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Food', description: 'name'})
    @Column()
    name: string;

    @ApiProperty({example: '2023-03-13 09:12:57.328022', description: 'created at'})
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @ManyToMany(() => Transaction, transaction => transaction.categories)
    transactions: Transaction[];
}