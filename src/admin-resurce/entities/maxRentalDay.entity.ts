import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'maxRentalDay' })
export class MaxRentalDayEntity {
    @PrimaryGeneratedColumn({})
    id: number

    @Column()
    day: number
}