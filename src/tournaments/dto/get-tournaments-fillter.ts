import {  IsNotEmpty, IsOptional } from "class-validator";

export class GetTournamentsFillter{
    @IsOptional()
    name:string;
    

}