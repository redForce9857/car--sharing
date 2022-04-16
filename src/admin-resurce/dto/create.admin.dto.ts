import {IsAlpha, IsString, Length} from "class-validator";

export class CreateAdminDto {
    @IsAlpha()
    readonly username: string
    @Length(6)
    @IsString()
    readonly password: string
}