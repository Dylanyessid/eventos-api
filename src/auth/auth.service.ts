import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.model';
import { RegisterDTO } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import {genSalt, hash, compare} from "bcrypt"
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    private readonly saltRounds = 10;
    constructor( @InjectModel(User) private readonly userModel: typeof User, private readonly jwtService: JwtService, ){ }

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

    async validateUser(email:string, password:string):Promise<Boolean | null>{
        try {
            const user = await this.userModel.findOne({
                where:{
                    email,
                    deletedAt:null
                },
                attributes: ['email', 'password']
            })
            if(!user) return false
            return this.comparePassword(password, user.password)
        } catch (error) {
            return null
        }
    }
    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(this.saltRounds);
        return await hash(password, salt);
    }
    
     login(payload:object): string{
        return this.jwtService.sign(payload)
    }

    private async comparePassword(plainPassword: string,hashedPassword: string,
      ): Promise<boolean> {
        return await compare(plainPassword, hashedPassword);
      }

   


}
