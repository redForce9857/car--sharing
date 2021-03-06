import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {RentsEntity} from "../../rentals/entities/rental.entity";

@Entity({name: "Cars"})
export class CarEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    number: string;

    @OneToMany(() => RentsEntity, (rent) => rent.car)
    rents: RentsEntity[];
}