import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    code: string;
    @IsNotEmpty()
    instructor: string;
    @IsNotEmpty()
    @Min(1)
    @Max(10)
    @IsNumber()
    credits: number;
    @IsOptional()
    description: string;
}