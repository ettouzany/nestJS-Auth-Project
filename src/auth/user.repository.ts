import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentials: AuthCredentialsDto) : Promise<void>{
        const {username,password} = authCredentials;


        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashcode(password, user.salt);
        try{
            await user.save();
        } catch(error){
            if(error.code === '23505'){
                throw new ConflictException('Username already exists');
            }
            else{
                throw new InternalServerErrorException();
            }
        }

    }

    async validateUser(authCredentials: AuthCredentialsDto) : Promise<string>{
        const {username,password} = authCredentials;
        const user = await this.findOne({username});

        if(user && user.validatePassword(password))
            return user.username;
        else 
            return null
    }
    private async hashcode(password:string, salt:string) : Promise<string>{
        return bcrypt.hash(password, salt);
    }
}