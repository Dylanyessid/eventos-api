import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.model';
import { RegisterDTO } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import {genSalt, hash, compare} from "bcrypt"
@Injectable()
export class AuthService {

    constructor( @InjectModel(User) private readonly userModel: typeof User ){ }

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

    async checkIfUserExists(email:string): Promise<Boolean | null> {
        try {
            return Boolean(await this.userModel.findOne({
                where:{
                    email,
                    deletedAt: null
                }
            }))
        } catch (error) {
            return null
        }
        
    }


    private readonly saltRounds = 10;
    
    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(this.saltRounds);
        return await hash(password, salt);
      }
    
      async comparePassword(plainPassword: string,hashedPassword: string,
      ): Promise<boolean> {
        return await compare(plainPassword, hashedPassword);
      }

   


}
