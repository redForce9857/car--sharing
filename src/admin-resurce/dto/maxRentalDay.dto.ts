import {IsNumber} from "class-validator";

export class MaxRentalDayDto{
    @IsNumber()
    readonly day: number
}