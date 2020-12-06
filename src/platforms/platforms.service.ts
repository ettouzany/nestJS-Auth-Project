import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Platform } from './platform.entity';
import { PlatformRepository } from './platforms.repository';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { GetPlatformsFillter } from './dto/get-platforms-fillter';
@Injectable()
export class PlatformsService {
    constructor(
        @InjectRepository(PlatformRepository)
        private platformsrepository:PlatformRepository,
    )
    {}
    async getPlatforms(getPlatformsFillter:GetPlatformsFillter,user:User) : Promise<Platform[]>{
        return this.platformsrepository.getPlatforms(getPlatformsFillter,user);
    }

    async getPlatformById(id:number,user:User) : Promise<Platform>{
        const found = await this.platformsrepository.findOne({where:{id,userId:user.id}});
        //const found = await this.platformsrepository.findOne(id);
        if(!found)
            throw new NotFoundException();
        else
            return found;
    }

    async createPlatform(createPlatformDto : CreatePlatformDto,image:any, user: User) : Promise<Platform>{
        return this.platformsrepository.createPlatform(createPlatformDto, image, user);
     }
    async UpdatePlatformById(id:number,name:string,user:User) : Promise<Platform>{
        const platform = await this.getPlatformById(id,user);
        platform.name = name;
        platform.save();
        return platform;
    }

    async deletePlatformById(id:number, user: User):Promise<number>{
        const found = await this.platformsrepository.delete({id});
        return found.affected;
    }
}
