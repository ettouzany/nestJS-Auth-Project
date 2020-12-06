import { IsNotEmpty } from "class-validator";


export class CreateTournamentDto{
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    size: number;
    
    @IsNotEmpty()
    is_team: boolean;
}