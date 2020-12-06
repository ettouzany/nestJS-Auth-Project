import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TournamentsController } from './tournaments.controller';
import { TournamentRepository } from './tournaments.repository';
import { TournamentsService } from './tournaments.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([TournamentRepository]),
    AuthModule,
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService]
})
export class TournamentsModule {}
