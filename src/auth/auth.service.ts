import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../schemas/user.model';
import { RegisterDTO } from './dto/register.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../schemas/userRoles.model';
import { RoleEnum } from '../types/enums/role';
import {Sequelize} from 'sequelize-typescript';

interface IValidateResult {
  isValidUser: boolean|null|undefined, 
  id:number|null|undefined
  role?:number|null
}

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    @InjectModel(UserRole) private readonly roleUserModel: typeof UserRole,
    private readonly sequelize: Sequelize
  ) {}

  async createUser(newUserData: RegisterDTO): Promise<User | null> {
    const transaction = await this.sequelize.transaction()
    try {
      const { name, email, password } = newUserData;

      //Create and save the user record in DB
      const userSaved = await this.userModel
        .build({
          name,
          email,
          password,
        })
        .save({transaction});

      await this.roleUserModel
        .build({
          userId: userSaved.id,
          roleId: RoleEnum.USER,
        })
        .save({transaction});
        await transaction.commit();
      return userSaved;
    } catch (error) {
        await transaction.rollback();
        return null
    }
  }

  async getAllUsers(): Promise<User[] | []> {
    const a = await this.userModel.findAll();
    return [];
  }

  async checkIfUserExists(email: string): Promise<Boolean | null> {
    try {
      return Boolean(
        await this.userModel.findOne({
          where: {
            email,
            deletedAt: null,
          },
        }),
      );
    } catch (error) {
      return null;
    }
  }


  async validateUser(email: string, password: string): Promise<IValidateResult> {
    try {
      const user = await this.userModel.findOne({
        where: {
          email,
          deletedAt: null,
        },
        attributes: ['email', 'password', 'id'],
      });
      if (!user) return {isValidUser:false, id:null};
      const role = await this.roleUserModel.findOne({
        where:{
          userId:user.id
        }
      })

      const isValidUser = await this.comparePassword(password, user.password)
      return {isValidUser, id:user.id, role: role.roleId} 
    } catch (error) {
      return null;
    }
  }
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);
    return await hash(password, salt);
  }

  async login(payload: object): Promise<string> {
    return this.jwtService.sign(payload);
  }

  private async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
  }
}
