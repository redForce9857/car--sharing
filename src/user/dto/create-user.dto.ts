import {IsEmail, IsOptional} from "class-validator";

export class UserDto {
    @IsEmail()
    email: string;
    @IsOptional()
    password: string;
}