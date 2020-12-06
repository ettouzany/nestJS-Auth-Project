import {  IsNotEmpty, IsOptional } from "class-validator";

export class GetPlatformsFillter{
    @IsOptional()
    name:string;
    

}