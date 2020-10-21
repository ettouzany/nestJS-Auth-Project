import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { AuthGuard } from '@nestjs/passport';
import { title } from 'process';
import { GetUser } from 'src/auth/getUser.decoretor';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { GetCoursesFillter } from './dto/get-courses-fillter';
import { CourseCreateValidationPipe } from './dto/pipes/create-course-validation-pipe';

@Controller('courses')
@UseGuards(AuthGuard())
export class CoursesController {
    constructor(
        private coursesService: CoursesService,
    ){}
    
    @Get()
    getCourses(
        @Query(ValidationPipe) getCoursesFillter:GetCoursesFillter,
        @GetUser() user:User,
        ) : Promise<Course[]>{
        return this.coursesService.getCourses(getCoursesFillter,user);
    }

    @Get(':id')
    getCourseByid(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<Course>{
        return this.coursesService.getCourseById(id,user);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createCourse(
        @Body() createCourseDto : CreateCourseDto,
        @GetUser() user:User,
    ) : Promise<Course>{
        console.log(user);
        return this.coursesService.createCourse(createCourseDto, user);
    }

    @Patch(':id/:title')
    UpdateCourseById(@Param('id',ParseIntPipe) id:number,@Body('title',CourseCreateValidationPipe) title:string,@GetUser() user:User) : Promise<Course>{
        return this.coursesService.UpdateCourseById(id,title,user);
    }

    @Delete(':id')
    deleteCourseById(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<number>{
        return this.coursesService.deleteCourseById(id,user);
    }
}
