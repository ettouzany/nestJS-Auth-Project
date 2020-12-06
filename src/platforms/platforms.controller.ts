import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { AuthGuard } from '@nestjs/passport';
import { title } from 'process';
import { GetUser } from 'src/auth/getUser.decoretor';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Platform } from './platform.entity';
import { PlatformsService } from './platforms.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { GetPlatformsFillter } from './dto/get-platforms-fillter';
import { PlatformCreateValidationPipe } from './dto/pipes/create-platform-validation-pipe';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { extname } from 'path';
import { diskStorage } from 'multer'

@Controller('platforms')
@UseGuards(AuthGuard())
export class PlatformsController {
    constructor(
        private platformsService: PlatformsService,
    ){}
    
    @Get()
    getPlatforms(
        @Query(ValidationPipe) getPlatformsFillter:GetPlatformsFillter,
        @GetUser() user:User,
        ) : Promise<Platform[]>{
        return this.platformsService.getPlatforms(getPlatformsFillter,user);
    }

    @Get(':id')
    getPlatformByid(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<Platform>{
        return this.platformsService.getPlatformById(id,user);
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
    createPlatform(
        @Body() createPlatformDto : CreatePlatformDto,
        @GetUser() user:User,
        @UploadedFile() image
    ) : Promise<Platform>{
        console.log(image);
        return this.platformsService.createPlatform(createPlatformDto,image, user);
    }

    @Patch(':id/:nom')
    UpdatePlatformById(@Param('id',ParseIntPipe) id:number,@Body('nom',PlatformCreateValidationPipe) nom:string,@GetUser() user:User) : Promise<Platform>{
        return this.platformsService.UpdatePlatformById(id,nom,user);
    }

    @Delete(':id')
    deletePlatformById(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<number>{
        return this.platformsService.deletePlatformById(id,user);
    }
}
