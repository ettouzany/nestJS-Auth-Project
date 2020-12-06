import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EntitesController } from './entites.controller';
import { EntiteRepository } from './entites.repository';
import { EntitesService } from './entites.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([EntiteRepository]),
    AuthModule,
  ],
  controllers: [EntitesController],
  providers: [EntitesService]
})
export class EntitesModule {}
