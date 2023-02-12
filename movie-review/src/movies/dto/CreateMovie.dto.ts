import { IsNotEmpty, MinLength , IsOptional } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @IsOptional()
    coverpage: string;

    @IsOptional()
    trailer: string;
}