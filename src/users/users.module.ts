import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports:[SequelizeModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
