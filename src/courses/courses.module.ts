import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CoursesController } from './courses.controller';
import { CourseRepository } from './courses.repository';
import { CoursesService } from './courses.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([CourseRepository]),
    AuthModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
