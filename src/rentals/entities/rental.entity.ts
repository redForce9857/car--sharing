import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {CarEntity} from "../../car/entities/car.entity";
import {TariffsEntity} from "../../tariffs/entities/tariff.entity";
import {DiscountEntity} from "../../discounts/entities/discount.entity";

@Entity({name: 'Rents'})
export class RentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', default: new Date()})
    created_date: Date;

    @Column({type: 'date'})
    from: Date;

    @Column({type: 'date'})
    to: Date;

    @Column({type: "float"})
    payment: number;

    @ManyToOne(() => UserEntity, user => user.rents)
    user: UserEntity;

    @ManyToOne(() => CarEntity, car => car.rents)
    car: CarEntity;

    @ManyToOne(() => TariffsEntity, tariff => tariff.rents)
    tariff: TariffsEntity;

    @ManyToOne(() => DiscountEntity, discount => discount.rents)
    discount: DiscountEntity;
}