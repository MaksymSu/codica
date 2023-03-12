import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
 
@Entity('banks')
export class Bank {
    @ApiProperty({example: '33', description: 'unique id'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Privatbank', description: 'name'})
    @Column()
    name: string;

    @ApiProperty({example: '3000', description: 'balance'})
    @Column()
    balance: number;
}