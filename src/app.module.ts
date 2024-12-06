import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { User } from './schemas/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { APP_GUARD, Reflector, APP_FILTER } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AllExceptionsFilter } from './filters/exceptionsFilter';


@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        define:{
          scopes:{
            excludeCreatedAtUpdateAt:{
              
            }
          }
        },
        
        dialect:'postgres',
        host:configService.get('DB_HOST'),
        port:configService.get('DB_PORT'),
        username:configService.get('DB_USERNAME'),
        password:configService.get('DB_PASSWORD'),
        database:configService.get('DB_DATABASE'),
        models:[User],
        autoLoadModels:true,
      }),
      inject:[ConfigService]
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    EventsModule,

  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_GUARD,
      useClass:JwtAuthGuard
    },
    
    Reflector
  ],
})
export class AppModule {}
