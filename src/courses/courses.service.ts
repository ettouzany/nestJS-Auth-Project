import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    async getCourses(getCoursesFillter:GetCoursesFillter) : Promise<Course[]>{
        return this.coursesrepository.getCourses(getCoursesFillter);
    }

    async getCourseById(id:number) : Promise<Course>{
        const found = await this.coursesrepository.findOne(id);
        if(!found)
            throw new NotFoundException();
        else
            return found;
    }

    async createCourse(createCourseDto : CreateCourseDto) : Promise<Course>{
        return this.coursesrepository.createCourse(createCourseDto);
     }
    async UpdateCourseById(id:number,title:string) : Promise<Course>{
        const course = await this.getCourseById(id);
        course.title = title;
        course.save();
        return course;
    }

    async deleteCourseById(id:number):Promise<number>{
        const found = await this.coursesrepository.delete(id);
        return found.affected;
    }
}
