import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from 'src/schemas/event.model';
import { UserRole } from 'src/schemas/userRoles.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([Event, UserRole])],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
