import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.model';

@Injectable()
export class UsersService {


    constructor( @InjectModel(User) private readonly userModel: typeof User){    }

    async getUserByEmail(email:string){
        return this.userModel.findOne({
            where:{
                email
            }
        })
    }

}
