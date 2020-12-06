import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { AuthGuard } from '@nestjs/passport';
import { title } from 'process';
import { GetUser } from 'src/auth/getUser.decoretor';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Entite } from './entite.entity';
import { EntitesService } from './entites.service';
import { CreateEntiteDto } from './dto/create-entite.dto';
import { GetEntitesFillter } from './dto/get-entites-fillter';
import { EntiteCreateValidationPipe } from './dto/pipes/create-entite-validation-pipe';

@Controller('entites')
@UseGuards(AuthGuard())
export class EntitesController {
    constructor(
        private entitesService: EntitesService,
    ){}
    
    @Get()
    getEntites(
        @Query(ValidationPipe) getEntitesFillter:GetEntitesFillter,
        @GetUser() user:User,
        ) : Promise<Entite[]>{
        return this.entitesService.getEntites(getEntitesFillter,user);
    }

    @Get(':id')
    getEntiteByid(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<Entite>{
        return this.entitesService.getEntiteById(id,user);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createEntite(
        @Body() createEntiteDto : CreateEntiteDto,
        @GetUser() user:User,
    ) : Promise<Entite>{
        console.log(user);
        return this.entitesService.createEntite(createEntiteDto, user);
    }

    @Patch(':id/:nom')
    UpdateEntiteById(@Param('id',ParseIntPipe) id:number,@Body('nom',EntiteCreateValidationPipe) nom:string,@GetUser() user:User) : Promise<Entite>{
        return this.entitesService.UpdateEntiteById(id,nom,user);
    }

    @Delete(':id')
    deleteEntiteById(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<number>{
        return this.entitesService.deleteEntiteById(id,user);
    }
}
