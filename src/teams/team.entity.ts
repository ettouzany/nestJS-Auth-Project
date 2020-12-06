import { User } from "src/auth/user.entity";
import { Tournament } from "src/tournaments/tournament.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    creation: Date;

    @Column()
    image:string;

    @ManyToMany(type => User, user=>user.tournaments,{eager:false})
    @JoinTable()
    players: User[];

    @ManyToMany(type => Tournament, teams=>teams.teams,{eager:false})
    tournaments: Tournament[];

    @ManyToOne(type => User, user=>user.tournaments,{eager:false})
    user: User;

    @Column()
    userId: number;
}