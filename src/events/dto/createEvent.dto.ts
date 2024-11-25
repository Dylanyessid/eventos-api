import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateEventDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsDateString()
    startDate:string

    @IsDateString()
    endDate:string

    @IsNotEmpty()
    location:string

    @IsNotEmpty()
    capacity:number

}