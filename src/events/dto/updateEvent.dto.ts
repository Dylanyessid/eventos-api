import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";


export class UpdateEventDTO {

    @IsOptional()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @IsDateString()
    startDate:string

    @IsOptional()
    @IsDateString()
    endDate:string

    @IsOptional()
    location:string

    @IsOptional()
    capacity:number

}