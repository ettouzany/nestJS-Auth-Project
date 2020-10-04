import {  IsNotEmpty, IsOptional } from "class-validator";

export class GetCoursesFillter{
    @IsOptional()
    status:string;
    
    @IsOptional()
    @IsNotEmpty()
    search:string;
}