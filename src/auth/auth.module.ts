import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import {JwtModule} from "@nestjs/jwt"
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
@Module({
    imports:[SequelizeModule.forFeature([User]), UsersModule, 
    JwtModule.registerAsync({
        imports: [ConfigModule], // Importar ConfigModule para acceder a las variables de entorno
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'), // Cargar el secreto desde las variables de entorno
            signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, // Cargar otras opciones si es necesario
        }),
        inject: [ConfigService],
    })
    ],
    controllers:[AuthController],
    providers:[AuthService, UsersService, JwtStrategy]
})
export class AuthModule {}
