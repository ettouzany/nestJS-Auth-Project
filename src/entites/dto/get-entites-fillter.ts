import {  IsNotEmpty, IsOptional } from "class-validator";

export class GetEntitesFillter{
    @IsOptional()
    nom:string;
    
    @IsOptional()
    @IsNotEmpty()
    code:string;
}