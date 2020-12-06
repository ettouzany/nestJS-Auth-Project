import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Tournament } from "./tournament.entity";
import { CreateTournamentDto } from "./dto/create-tournament.dto";
import { GetTournamentsFillter } from "./dto/get-tournaments-fillter";

@EntityRepository(Tournament)
export class TournamentRepository extends Repository<Tournament>{
    async getTournaments(getTournamentsFillter:GetTournamentsFillter, user:User) : Promise<Tournament[]>{
        const {name} = getTournamentsFillter;
        const quiry = this.createQueryBuilder('tournament');
        quiry.where('tournament.userId = :userId', {userId: user.id});
        if(name){
            quiry.andWhere('tournament.name = :name', {name});
        }

        // if(code){
        //     quiry.andWhere('(tournament.title LIKE :code OR tournament.description LIKE :code)', {code: `%${code}%`})
        // }

        const tournaments = await quiry.getMany();
        return tournaments;
    }

    async createTournament(createTournamentDto : CreateTournamentDto, user:User) : Promise<Tournament>{
        const {name} = createTournamentDto;
        const tournament = new Tournament();
        tournament.name = name;
        tournament.user = user;
        await tournament.save();
        return tournament;
    }
}