import {  IsNotEmpty, IsOptional } from "class-validator";

export class GetTeamsFillter{
    @IsOptional()
    name:string;
    

}