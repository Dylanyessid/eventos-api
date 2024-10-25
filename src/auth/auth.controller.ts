import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,private readonly usersService: UsersService){}

    @Get()
    async find(){
        await this.authService.getAllUsers()
        return 
    }

    @Post("/register")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() data: RegisterDTO){
        const alreadyExists = await this.authService.checkIfUserExists(data.email)
        if(alreadyExists === null) {
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        if(alreadyExists){
            throw new HttpException("User Already Exists", HttpStatus.CONFLICT)
        }
        data.password = await this.authService.hashPassword(data.password)
        const newUser = await this.authService.createUser(data)
        return {
            user:newUser
        }
    }

    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() data: LoginDTO): Promise<Record<string,string>>{
        const areValidCredentials = await this.authService.validateUser(data.email, data.password)
        if(areValidCredentials === null) {
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        if(!areValidCredentials){
            throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED)
        }
        return {
            token: this.authService.login({
                email:data.email
            })
        }

    }


}
