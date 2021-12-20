import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    name: string
    surname: string
    email: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    
    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'Justin', description: 'User\'s name'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: 'Bieber', description: 'User\'s surname'})
    @Column({type: DataType.STRING, allowNull: false})
    surname: string

    @ApiProperty({example: 'justinbieber@gmail.com', description: 'User\'s email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: 'justinbieberspassword2021', description: 'User\'s password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

}