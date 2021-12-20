import { CacheInterceptor, CACHE_MANAGER, Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs'
import { UpdateUserDto } from './dto/update-user.dto';
import { Cache } from 'cache-manager'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

        /* GET functions */
    //GET method for GET request
    @UseInterceptors(CacheInterceptor)
    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }

    //GET method for GET request by ID
    @UseInterceptors(CacheInterceptor)
    async getUserById(id: number) {
        const usersId = await this.userRepository.findOne({where: {id}})
        return usersId
    }

    //GET method for GET request by Email
    @UseInterceptors(CacheInterceptor)
    async getUserByEmail(email: string) {
        const userEmail = await this.userRepository.findOne({where: {email}})
        return userEmail
    }


        /* POST function */ 
    //POST method for POST request
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }
    

        /* DELETE function */
    //DELETE method for DELETE request by ID
    async removeUser(id: number) {
        return await this.userRepository.destroy({where: {id}})
    }


        /* PUT function */
    //PUT method for PUT request by ID
    async updateUser(dto: UpdateUserDto, id: number) {
        const user = await this.userRepository.findOne({where: {id}})
        return await user.update(await this.hashPassword(dto));
    }

    private async hashPassword(dto: UpdateUserDto) {
        return {...dto, password: await bcrypt.hash(dto.password, 5)};
    }
}
