import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min, MinLength } from "class-validator";

export class UpdateReviewDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    @Max(10)
    rating: number;

    @IsOptional()
    @MinLength(10)
    review: string;
}