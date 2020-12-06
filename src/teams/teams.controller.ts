import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { AuthGuard } from '@nestjs/passport';
import { title } from 'process';
import { GetUser } from 'src/auth/getUser.decoretor';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Team } from './team.entity';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamsFillter } from './dto/get-teams-fillter';
import { TeamCreateValidationPipe } from './dto/pipes/create-team-validation-pipe';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { extname } from 'path';
import { diskStorage } from 'multer'

@Controller('teams')
@UseGuards(AuthGuard())
export class TeamsController {
    constructor(
        private teamsService: TeamsService,
    ){}
    
    @Get()
    getTeams(
        @Query(ValidationPipe) getTeamsFillter:GetTeamsFillter,
        @GetUser() user:User,
        ) : Promise<Team[]>{
        return this.teamsService.getTeams(getTeamsFillter,user);
    }

    @Get(':id')
    getTeamByid(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<Team>{
        return this.teamsService.getTeamById(id,user);
    }


    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads'
          , filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }))
    @UsePipes(ValidationPipe)
    createTeam(
        @Body() createTeamDto : CreateTeamDto,
        @GetUser() user:User,
        @UploadedFile() image
    ) : Promise<Team>{
        console.log(image);
        return this.teamsService.createTeam(createTeamDto,image, user);
    }

    @Patch(':id/:nom')
    UpdateTeamById(@Param('id',ParseIntPipe) id:number,@Body('nom',TeamCreateValidationPipe) nom:string,@GetUser() user:User) : Promise<Team>{
        return this.teamsService.UpdateTeamById(id,nom,user);
    }

    @Delete(':id')
    deleteTeamById(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<number>{
        return this.teamsService.deleteTeamById(id,user);
    }
}
