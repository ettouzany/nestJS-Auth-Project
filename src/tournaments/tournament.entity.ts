import { User } from "src/auth/user.entity";
import { Team } from "src/teams/team.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    size: string;

    @Column()
    is_team: boolean;

    @ManyToOne(type => User, user=>user.owned_tournaments,{eager:false})
    user: User;

    @ManyToMany(()  => Team, team=>team.tournaments,{eager:false})
    @JoinTable()
    teams: Team[];

    @ManyToMany(()  => User, user=>user.tournaments,{eager:false})
    @JoinTable()
    players: User[];
    
    @Column()
    userId: number;
}