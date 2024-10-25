import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class RegisterDTO {

    @IsString()
    @IsNotEmpty()
    name:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    @Length(8)
    password:string
}