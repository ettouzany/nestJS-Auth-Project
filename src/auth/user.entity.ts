import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";
import { Course } from "src/courses/course.entity";
import { Entite } from "src/entites/entite.entity";
import { Tournament } from "src/tournaments/tournament.entity";
import { Team } from "src/teams/team.entity";

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
    
    @OneToMany(type => Entite, entite=> entite.user, {eager: true})
    entites: Entite[];

    @ManyToMany(type => Team, team=>team.players,{eager:false})
    teams: Team[];

    @ManyToMany(type => Tournament, tournament=> tournament.players, {eager: true})
    tournaments: Tournament[];
    
    @OneToMany(type => Tournament, tournament=> tournament.user, {eager: true})
    owned_tournaments: Tournament[];

    async validatePassword(password: string) : Promise<Boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}