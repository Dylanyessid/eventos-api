import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEventDTO } from './dto/createEvent.dto';
import { Roles } from 'src/decorators/authorization.decorator';
import { RoleEnum } from 'src/types/enums/role';

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

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @HttpCode(HttpStatus.CREATED)
    @Roles(RoleEnum.USER)
    async getById (@Param('id') id:string){
        const event = await this.eventService.getById(Number(id))
        return event;
    }

}
