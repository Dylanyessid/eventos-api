import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEventDTO } from './dto/createEvent.dto';
import { Roles } from 'src/decorators/authorization.decorator';
import { RoleEnum } from 'src/types/enums/role';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('events')
export class EventsController {

    constructor(private readonly eventService:EventsService){

    }

    
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    @Roles(RoleEnum.ORGANIZER)
    @UseGuards(JwtAuthGuard,RolesGuard)
    async create (@Body() createEventDTO:CreateEventDTO){
        const event = await this.eventService.createEvent(createEventDTO)
        return event;
    }

    
    @Get(':id')
    @HttpCode(HttpStatus.CREATED)
    @Roles(RoleEnum.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getById (@Param('id') id:string){
        const event = await this.eventService.getById(Number(id))
        return event;
    }

}
