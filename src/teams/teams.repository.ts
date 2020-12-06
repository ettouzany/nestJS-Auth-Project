import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Team } from "./team.entity";
import { CreateTeamDto } from "./dto/create-team.dto";
import { GetTeamsFillter } from "./dto/get-teams-fillter";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team>{
    async getTeams(getTeamsFillter:GetTeamsFillter, user:User) : Promise<Team[]>{
        const {name} = getTeamsFillter;
        const quiry = this.createQueryBuilder('team');
        quiry.where('team.userId = :userId', {userId: user.id});
        if(name){
            quiry.andWhere('team.name = :name', {name});
        }

        // if(code){
        //     quiry.andWhere('(team.title LIKE :code OR team.description LIKE :code)', {code: `%${code}%`})
        // }

        const teams = await quiry.getMany();
        return teams;
    }

    async createTeam(createTeamDto : CreateTeamDto,image:any, user:User) : Promise<Team>{
        const {name} = createTeamDto;
        const team = new Team();

        team.name = name;
        team.image = image.filename;
        team.creation = new Date();
        team.user = user;
        await team.save();
        return team;
    }
}