import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Course } from "./course.entity";
import { CreateCourseDto } from "./dto/create-course.dto";
import { GetCoursesFillter } from "./dto/get-courses-fillter";

@EntityRepository(Course)
export class CourseRepository extends Repository<Course>{
    async getCourses(getCoursesFillter:GetCoursesFillter, user:User) : Promise<Course[]>{
        const {status,search} = getCoursesFillter;
        const quiry = this.createQueryBuilder('course');
        quiry.where('course.userId = :userId', {userId: user.id});
        if(status){
            quiry.andWhere('course.status = :status', {status});
        }

        if(search){
            quiry.andWhere('(course.title LIKE :search OR course.description LIKE :search)', {search: `%${search}%`})
        }

        const courses = await quiry.getMany();
        return courses;
    }

    async createCourse(createCourseDto : CreateCourseDto, user:User) : Promise<Course>{
        const {title,description} = createCourseDto;
        const course = new Course();
        course.title = title;
        course.description = description;
        course.user = user;
        await course.save();
        return course;
    }
}