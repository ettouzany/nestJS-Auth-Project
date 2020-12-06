import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { AuthGuard } from '@nestjs/passport';
import { title } from 'process';
import { GetUser } from 'src/auth/getUser.decoretor';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Tournament } from './tournament.entity';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { GetTournamentsFillter } from './dto/get-tournaments-fillter';
import { TournamentCreateValidationPipe } from './dto/pipes/create-tournament-validation-pipe';

@Controller('tournaments')
@UseGuards(AuthGuard())
export class TournamentsController {
    constructor(
        private tournamentsService: TournamentsService,
    ){}
    
    @Get()
    getTournaments(
        @Query(ValidationPipe) getTournamentsFillter:GetTournamentsFillter,
        @GetUser() user:User,
        ) : Promise<Tournament[]>{
        return this.tournamentsService.getTournaments(getTournamentsFillter,user);
    }

    @Get(':id')
    getTournamentByid(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<Tournament>{
        return this.tournamentsService.getTournamentById(id,user);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTournament(
        @Body() createTournamentDto : CreateTournamentDto,
        @GetUser() user:User,
    ) : Promise<Tournament>{
        console.log(user);
        return this.tournamentsService.createTournament(createTournamentDto, user);
    }

    @Patch(':id/:nom')
    UpdateTournamentById(@Param('id',ParseIntPipe) id:number,@Body('nom',TournamentCreateValidationPipe) nom:string,@GetUser() user:User) : Promise<Tournament>{
        return this.tournamentsService.UpdateTournamentById(id,nom,user);
    }

    @Delete(':id')
    deleteTournamentById(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<number>{
        return this.tournamentsService.deleteTournamentById(id,user);
    }
}
