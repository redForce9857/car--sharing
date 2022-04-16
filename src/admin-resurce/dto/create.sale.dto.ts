import { IsNumber, IsString } from "class-validator"

export class CreateSaleDto {
    @IsString()
    readonly description: string
    @IsNumber()
    readonly percentages: number
    @IsNumber()
    readonly from: number
    @IsNumber()
    readonly to: number
}