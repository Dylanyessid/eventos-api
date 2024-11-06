import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName:"events", timestamps:false})
export class Events extends Model<Events> {

    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    })
    id:number

    @Column
    name:string

    @Column
    description:string

    @Column({
        type:DataType.DATE,
        field:'start_date',
        allowNull:false
     })
    startDate:string

    @Column({
        type:DataType.DATE,
        field:'end_date',
        allowNull:false
     })
    endDate:string
    
    @Column
    locations:string

    @Column
    capacity:number

    @Column({
        type:DataType.DATE,
        field:'deleted_at',
        allowNull:true
     })
     deletedAt:string
}