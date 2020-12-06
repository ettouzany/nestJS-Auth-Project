import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Tournament } from './tournament.entity';
import { TournamentRepository } from './tournaments.repository';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { GetTournamentsFillter } from './dto/get-tournaments-fillter';
@Injectable()
export class TournamentsService {
    constructor(
        @InjectRepository(TournamentRepository)
        private tournamentsrepository:TournamentRepository,
    )
    {}
    async getTournaments(getTournamentsFillter:GetTournamentsFillter,user:User) : Promise<Tournament[]>{
        return this.tournamentsrepository.getTournaments(getTournamentsFillter,user);
    }

    async getTournamentById(id:number,user:User) : Promise<Tournament>{
        const found = await this.tournamentsrepository.findOne({where:{id,userId:user.id}});
        //const found = await this.tournamentsrepository.findOne(id);
        if(!found)
            throw new NotFoundException();
        else
            return found;
    }

    async createTournament(createTournamentDto : CreateTournamentDto, user: User) : Promise<Tournament>{
        return this.tournamentsrepository.createTournament(createTournamentDto, user);
     }
    async UpdateTournamentById(id:number,name:string,user:User) : Promise<Tournament>{
        const tournament = await this.getTournamentById(id,user);
        tournament.name = name;
        tournament.save();
        return tournament;
    }

    async deleteTournamentById(id:number, user: User):Promise<number>{
        const found = await this.tournamentsrepository.delete({id,userId:user.id});
        return found.affected;
    }
}
