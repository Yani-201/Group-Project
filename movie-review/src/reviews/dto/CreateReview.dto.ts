import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Max, Min, MinLength } from "class-validator";

export class CreateReviewDto {
    @IsInt()
    @Type(() => Number)
    @Min(1)
    @Max(10)
    rating: number;

    @IsNotEmpty()
    @MinLength(10)
    review: string;

    @IsNotEmpty()
    movieId: number;

}