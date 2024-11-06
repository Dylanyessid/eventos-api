import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from 'src/schemas/event.model';
import { CreateEventDTO } from './dto/createEvent.dto';

@Injectable()
export class EventsService {
    
    constructor(@InjectModel(Event) private readonly eventModel: typeof Event){

    }


    
    async createEvent (data:CreateEventDTO):Promise<Event | null> {
        const {name, capacity ,description, endDate, location, startDate} = data
        return this.eventModel.build(
            {
                name,
                capacity,
                description,
                endDate: new Date(endDate),
                startDate: new Date(startDate),
                location
            }
         ).save()
    }


}
