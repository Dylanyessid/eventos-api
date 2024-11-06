import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEventDTO } from './dto/createEvent.dto';

@Controller('events')
export class EventsController {

    constructor(private readonly eventService:EventsService){

    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async create (@Body() createEventDTO:CreateEventDTO){
        const event = await this.eventService.createEvent(createEventDTO)
        return event;
    }

}
