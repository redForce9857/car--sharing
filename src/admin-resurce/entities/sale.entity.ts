
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sales'})
export class SaleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    percentages: number

    @Column()
    from: number

    @Column()
    to: number
}