import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PlatformsController } from './platforms.controller';
import { PlatformRepository } from './platforms.repository';
import { PlatformsService } from './platforms.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([PlatformRepository]),
    AuthModule,
  ],
  controllers: [PlatformsController],
  providers: [PlatformsService]
})
export class PlatformsModule {}
