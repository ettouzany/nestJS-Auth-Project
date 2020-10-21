import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Course } from './course.entity';
import { CourseRepository } from './courses.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { GetCoursesFillter } from './dto/get-courses-fillter';
@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseRepository)
        private coursesrepository:CourseRepository,
    )
    {}
    async getCourses(getCoursesFillter:GetCoursesFillter,user:User) : Promise<Course[]>{
        return this.coursesrepository.getCourses(getCoursesFillter,user);
    }

    async getCourseById(id:number,user:User) : Promise<Course>{
        const found = await this.coursesrepository.findOne({where:{id,userId:user.id}});
        //const found = await this.coursesrepository.findOne(id);
        if(!found)
            throw new NotFoundException();
        else
            return found;
    }

    async createCourse(createCourseDto : CreateCourseDto, user: User) : Promise<Course>{
        return this.coursesrepository.createCourse(createCourseDto, user);
     }
    async UpdateCourseById(id:number,title:string,user:User) : Promise<Course>{
        const course = await this.getCourseById(id,user);
        course.title = title;
        course.save();
        return course;
    }

    async deleteCourseById(id:number, user: User):Promise<number>{
        const found = await this.coursesrepository.delete({id,userId:user.id});
        return found.affected;
    }
}
