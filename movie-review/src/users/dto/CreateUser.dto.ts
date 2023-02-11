import { IsNotEmpty, MinLength , IsEmail, IsAlphanumeric } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsAlphanumeric()
    username: string;
    
    @IsNotEmpty()
    @MinLength(4)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}