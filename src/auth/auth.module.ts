import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports:[SequelizeModule.forFeature([User]), UsersModule],
    controllers:[AuthController],
    providers:[AuthService, UsersService]
})
export class AuthModule {}
