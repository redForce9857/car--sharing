import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {CarEntity} from "../../car/entities/car.entity";
import {TariffEntity} from "../../admin-resurce/entities/tarrif.entity";


@Entity({name: 'rentals'})
export class RentalEntity{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity

    @OneToOne(() => CarEntity)
    @JoinColumn()
    car: CarEntity

    @ManyToOne(() => TariffEntity, tariff => tariff.rentals)
    tariff: TariffEntity

    @Column()
    rentalDay: number

    @Column()
    rentalDate: Date
}