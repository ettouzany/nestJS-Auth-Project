import { IsNotEmpty } from "class-validator";


export class CreatePlatformDto{
    @IsNotEmpty()
    name: string;
    
}