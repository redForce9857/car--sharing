import { IsDate, IsNumber, IsOptional } from "class-validator"

export class CreateRentalDto {
    @IsNumber()
    readonly car: number
    @IsNumber()
    readonly tarrif: number
    @IsNumber()
    readonly rentalDay: number
    @IsOptional()
    @IsDate()
    readonly rentalDate: Date
}