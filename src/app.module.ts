import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { EntitesModule } from './entites/entites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CoursesModule,
    EntitesModule,
    AuthModule],
})
export class AppModule {}
