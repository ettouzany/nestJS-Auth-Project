import { EntityRepository, Repository } from "typeorm";
import { Course } from "./course.entity";
import { CreateCourseDto } from "./dto/create-course.dto";
import { GetCoursesFillter } from "./dto/get-courses-fillter";

@EntityRepository(Course)
export class CourseRepository extends Repository<Course>{
    async getCourses(getCoursesFillter:GetCoursesFillter) : Promise<Course[]>{
        const {status,search} = getCoursesFillter;
        const quiry = this.createQueryBuilder('course');
        if(status){
            quiry.andWhere('course.status = :status', {status});
        }

        if(search){
            quiry.andWhere('(course.title LIKE :search OR course.description LIKE :search)', {search: `%${search}%`})
        }
        const courses = await quiry.getMany();
        return courses;
    }

    async createCourse(createCourseDto : CreateCourseDto) : Promise<Course>{
        const {title,description} = createCourseDto;
        const course = new Course();
        course.title = title;
        course.description = description;
         

        await course.save();
        return course;
     }
}