import { IsNotEmpty } from "class-validator";


export class CreateEntiteDto{
    @IsNotEmpty()
    nom: string;
    
    @IsNotEmpty()
    code: string;
}