import { Sequelize } from "sequelize";
import {Column, DataType, Table, Model} from "sequelize-typescript"

@Table({tableName:"users", timestamps:false})
export class User extends Model<User>{
    
    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    })
    id:number

    @Column
    name:string

    @Column
    email:string

    @Column
    password:string

    @Column({
       type:DataType.DATE,
       field:'deleted_at',
       allowNull:true
    })
    deletedAt:string
}