import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEventDTO } from './dto/createEvent.dto';
import { Roles } from 'src/decorators/authorization.decorator';
import { RoleEnum } from 'src/types/enums/role';
import { RolesGuard } from 'src/roles/roles.guard';
import { UpdateEventDTO } from './dto/updateEvent.dto';

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
    @HttpCode(HttpStatus.OK)
    @Roles(RoleEnum.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getById (@Param('id') id:string){
        const event = await this.eventService.getById(Number(id))
        return event;
    }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    @Roles(RoleEnum.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAll(
        @Query('page') page: string = '1', // Página por defecto
        @Query('limit') limit: string = '10'
    ){

        const events = await this.eventService.getAll(Number(page),Number(limit))
        return events;
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    @Roles(RoleEnum.ORGANIZER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param('id') id:string){
        const event = await this.eventService.delete(Number(id))
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    @Roles(RoleEnum.ORGANIZER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('id') id:string, @Body() updateEventDTO:UpdateEventDTO){
        const [_,event] = await this.eventService.update(Number(id),updateEventDTO)
        return event
    }

}
