import { MinLength , IsOptional, IsNotEmpty } from "class-validator";

export class UpdateMovieDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @IsOptional()
    @IsNotEmpty()
    coverPage: string;

    @IsOptional()
    @IsNotEmpty()
    trailer: string;
}