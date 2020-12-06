import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Team } from './team.entity';
import { TeamRepository } from './teams.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamsFillter } from './dto/get-teams-fillter';
@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(TeamRepository)
        private teamsrepository:TeamRepository,
    )
    {}
    async getTeams(getTeamsFillter:GetTeamsFillter,user:User) : Promise<Team[]>{
        return this.teamsrepository.getTeams(getTeamsFillter,user);
    }

    async getTeamById(id:number,user:User) : Promise<Team>{
        const found = await this.teamsrepository.findOne({where:{id,userId:user.id}});
        //const found = await this.teamsrepository.findOne(id);
        if(!found)
            throw new NotFoundException();
        else
            return found;
    }

    async createTeam(createTeamDto : CreateTeamDto,image:any, user: User) : Promise<Team>{
        return this.teamsrepository.createTeam(createTeamDto, image, user);
     }
    async UpdateTeamById(id:number,name:string,user:User) : Promise<Team>{
        const team = await this.getTeamById(id,user);
        team.name = name;
        team.save();
        return team;
    }

    async deleteTeamById(id:number, user: User):Promise<number>{
        const found = await this.teamsrepository.delete({id,userId:user.id});
        return found.affected;
    }
}
