import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { User } from './schemas/user.model';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Module({
  imports: [
    SequelizeModule.forRoot({
      define:{
        scopes:{
          excludeCreatedAtUpdateAt:{
            
          }
        }
      },
      dialect:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'ReactExpressJS19#',
      database:'events_app',
      models:[User],
      autoLoadModels:true,
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
      provide: APP_GUARD,
      useClass:JwtAuthGuard
    },
    Reflector
  ],
})
export class AppModule {}
