import { BadRequestException, PipeTransform } from "@nestjs/common"

export class CourseCreateValidationPipe implements PipeTransform{
    transform(value:string){
        value.toLowerCase();
        if(value.length>10)
            throw new BadRequestException(value + "need to be less by " + (value.length - 10));
        return value;
    }
}