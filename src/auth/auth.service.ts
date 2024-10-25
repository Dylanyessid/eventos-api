import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.model';
import { RegisterDTO } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor( @InjectModel(User) private readonly userModel: typeof User ){
       
    }

    async createUser(newUserData: RegisterDTO): Promise<User | null>{
        const {name,email,password} = newUserData
        return this.userModel.build(
            {
                name,
                email,
                password
            }
        ).save()
        
    }


    async getAllUsers() : Promise<User[] | []> {
        
     

        const a = await this.userModel.findAll()
        return []
    }

   


}
