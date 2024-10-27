import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({tableName:"user_roles", timestamps:false})
export class UserRole extends Model<UserRole>{

    @Column({
        type:DataType.INTEGER,
        field:'user_id',
        primaryKey:true
    })
    userId:number
    @Column({
        type:DataType.INTEGER,
        field:'role_id',
        primaryKey:true
    })
    roleId:number
}