import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Entite } from "./entite.entity";
import { CreateEntiteDto } from "./dto/create-entite.dto";
import { GetEntitesFillter } from "./dto/get-entites-fillter";

@EntityRepository(Entite)
export class EntiteRepository extends Repository<Entite>{
    async getEntites(getEntitesFillter:GetEntitesFillter, user:User) : Promise<Entite[]>{
        const {nom,code} = getEntitesFillter;
        const quiry = this.createQueryBuilder('entite');
        quiry.where('entite.userId = :userId', {userId: user.id});
        if(nom){
            quiry.andWhere('entite.nom = :nom', {nom});
        }

        if(code){
            quiry.andWhere('(entite.title LIKE :code OR entite.description LIKE :code)', {code: `%${code}%`})
        }

        const entites = await quiry.getMany();
        return entites;
    }

    async createEntite(createEntiteDto : CreateEntiteDto, user:User) : Promise<Entite>{
        const {nom,code} = createEntiteDto;
        const entite = new Entite();
        entite.nom = nom;
        entite.code = code;
        entite.user = user;
        await entite.save();
        return entite;
    }
}