import { ApiProperty } from "@nestjs/swagger";
import { Bank } from "src/banks/banks.model";
import { Category } from "src/categories/categories.model";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
 
@Entity('transactions')
export class Transaction {
    @ApiProperty({example: '33', description: 'unique id'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: true, description: 'true - profitable,  false - consumable', required: true})
    @Column()
    type: boolean;
    
    @ApiProperty({example: 700, description: 'amount', required: true})
    @Column()
    amount: number;

    @ApiProperty({example: () => "CURRENT_TIMESTAMP(6)", description: 'created at', required: true})
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @ManyToMany(() => Category, category => category.transactions, {onDelete: 'CASCADE'})
    @JoinTable({name: 'transaction-category'})
    categories: Category[];

    @ManyToOne(() => Bank, bank => bank.transactions, {onDelete: 'RESTRICT'})
    bank: Bank;
}