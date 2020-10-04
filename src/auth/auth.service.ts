import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt/jwt.paylaod.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jtwServise: JwtService,
    ){}

    async signUp(authCredentialsDto:AuthCredentialsDto) : Promise<void>{
        return this.userRepository.signUp(authCredentialsDto);
    }
    
    async signIn(authCredentialsDto:AuthCredentialsDto) :Promise<{accessToken:string}> {
        const username = await this.userRepository.validateUser(authCredentialsDto);
        console.log(username);

        if(!username){
            throw new UnauthorizedException("invalide credentials");
        }

        const payload :JwtPayload = { username };
        const accessToken = await this.jtwServise.sign(payload);

        return { accessToken }
    }
}
