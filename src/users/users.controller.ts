import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get(':email')
    async getUserById(@Param('email') email:string){
        const user = await this.usersService.getUserByEmail(email)
        return user
    }
}
