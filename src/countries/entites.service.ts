import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Entite } from './entite.entity';
import { EntiteRepository } from './entites.repository';
import { CreateEntiteDto } from './dto/create-entite.dto';
import { GetEntitesFillter } from './dto/get-entites-fillter';
@Injectable()
export class EntitesService {
    constructor(
        @InjectRepository(EntiteRepository)
        private entitesrepository:EntiteRepository,
    )
    {}
    async getEntites(getEntitesFillter:GetEntitesFillter,user:User) : Promise<Entite[]>{
        return this.entitesrepository.getEntites(getEntitesFillter,user);
    }

    async getEntiteById(id:number,user:User) : Promise<Entite>{
        const found = await this.entitesrepository.findOne({where:{id,userId:user.id}});
        //const found = await this.entitesrepository.findOne(id);
        if(!found)
            throw new NotFoundException();
        else
            return found;
    }

    async createEntite(createEntiteDto : CreateEntiteDto, user: User) : Promise<Entite>{
        return this.entitesrepository.createEntite(createEntiteDto, user);
     }
    async UpdateEntiteById(id:number,nom:string,user:User) : Promise<Entite>{
        const entite = await this.getEntiteById(id,user);
        entite.nom = nom;
        entite.save();
        return entite;
    }

    async deleteEntiteById(id:number, user: User):Promise<number>{
        const found = await this.entitesrepository.delete({id,userId:user.id});
        return found.affected;
    }
}
