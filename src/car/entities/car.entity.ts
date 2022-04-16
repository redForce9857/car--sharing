import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'cars'})
export class CarEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    brand: string

    @Column()
    model: string

    @Column()
    stateNumber: string

    @Column()
    vin: string
}
