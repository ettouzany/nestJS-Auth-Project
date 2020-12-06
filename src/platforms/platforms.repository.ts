import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Platform } from "./platform.entity";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { GetPlatformsFillter } from "./dto/get-platforms-fillter";

@EntityRepository(Platform)
export class PlatformRepository extends Repository<Platform>{
    async getPlatforms(getPlatformsFillter:GetPlatformsFillter, user:User) : Promise<Platform[]>{
        const {name} = getPlatformsFillter;
        const quiry = this.createQueryBuilder('platform');
        quiry.where('platform.userId = :userId', {userId: user.id});
        if(name){
            quiry.andWhere('platform.name = :name', {name});
        }

        // if(code){
        //     quiry.andWhere('(platform.title LIKE :code OR platform.description LIKE :code)', {code: `%${code}%`})
        // }

        const platforms = await quiry.getMany();
        return platforms;
    }

    async createPlatform(createPlatformDto : CreatePlatformDto,image:any, user:User) : Promise<Platform>{
        const {name} = createPlatformDto;
        const platform = new Platform();

        platform.name = name;
        await platform.save();
        return platform;
    }
}