
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {RentalEntity} from "../../rentals/entities/rental.entity";

@Entity({name: 'tariffs'})
export class TariffEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    cost: number

    @Column()
    kilometer: number

    @OneToMany(() => RentalEntity, rental => rental.tariff)
    rentals: RentalEntity[]
}