import {Column} from "typeorm";

export class CreateCarDto {
    @Column()
    brand: string

    @Column()
    model: string

    @Column()
    stateNumber: string

    @Column()
    vin: string
}
