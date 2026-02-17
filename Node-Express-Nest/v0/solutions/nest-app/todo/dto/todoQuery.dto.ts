import { Transform } from "class-transformer";
import { IsOptional, IsInt, IsString, IsBoolean } from "class-validator";

export class TodoQueryDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    id?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    completed?: boolean;
}
