import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,private readonly usersService: UsersService){}

    @Get()
    async find(){
        await this.authService.getAllUsers()
        console.log("")
        return 
    }

    @Post("/register")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() data: RegisterDTO){
        const alreadyExists = Boolean(await this.usersService.getUserByEmail(data.email))
        if(alreadyExists){
            throw new HttpException("User Already Exists", HttpStatus.CONFLICT)
        }


        const newUser = await this.authService.createUser(data)
        return {
            user:newUser
        }
    }


}
