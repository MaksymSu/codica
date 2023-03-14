import { ApiProperty } from "@nestjs/swagger";
import { Bank } from "src/banks/banks.model";
import { Category } from "src/categories/categories.model";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
 
@Entity('transactions')
export class Transaction {
    @ApiProperty({example: '33', description: 'unique id'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: '2023-03-13 09:12:57.328022', description: 'created at'})
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @ManyToMany(() => Category, category => category.transactions, {onDelete: 'RESTRICT'})
    @JoinTable({name: 'transaction-category'})
    categories: Category[];

    @ManyToOne(() => Bank, party => party.transactionsA)
    party: Bank;

    @ManyToOne(() => Bank, counterparty => counterparty.transactionsB)
    counterparty: Bank;
}