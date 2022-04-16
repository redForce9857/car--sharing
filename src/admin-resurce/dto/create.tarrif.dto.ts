import { IsNumber, IsString } from "class-validator"

export class CreateTarrifDto {
    @IsString()
    readonly description: string
    @IsNumber()
    readonly cost: number
    @IsNumber()
    readonly kilometer: number
}