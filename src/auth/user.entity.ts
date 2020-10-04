import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";
import { Course } from "src/courses/course.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Course, courses=> courses.user, {eager: true})
    courses: Course[];
    
    async validatePassword(password: string) : Promise<Boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}