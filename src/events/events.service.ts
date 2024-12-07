
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';



import { InjectModel } from '@nestjs/sequelize';
import { Event } from 'src/schemas/event.model';
import { CreateEventDTO } from './dto/createEvent.dto';
import { UpdateEventDTO } from './dto/updateEvent.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event) private readonly eventModel: typeof Event) {}

  async createEvent(data: CreateEventDTO): Promise<Event | null> {
    const { name, capacity, description, endDate, location, startDate } = data;
    return this.eventModel
      .build({
        name,
        capacity,
        description,
        endDate: new Date(endDate),
        startDate: new Date(startDate),
        location,
      })
      .save();
  }

  async getById(id:number){

    if(!id ) throw new HttpException('Id is required', HttpStatus.BAD_REQUEST)
    if(typeof id !== 'number' || isNaN(id) || id < 0) throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST)
    

    return this.eventModel.findOne({where:{deletedAt: null, id}})

  }

  async getAll(page:number,limit:number){
    return this.eventModel.findAll({where:{deletedAt: null}, offset: (page - 1) * limit, limit})
  }

  async delete(id:number){
    return this.eventModel.update({deletedAt: new Date()},{where:{id}})
  }

  async update(id:number,data:UpdateEventDTO){
    const transformedData = {}
    Object.keys(data).forEach(key => {
      const parsedDate = new Date(data[key]).getTime()
      if (!isNaN(parsedDate)) {
        transformedData[key] = new Date(parsedDate);
      }else{
        transformedData[key] = data[key]
      }
    })

    return this.eventModel.update(transformedData,{where:{id}, returning:true})
  }
}
