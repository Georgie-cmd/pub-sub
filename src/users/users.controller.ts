import { Body, CacheInterceptor, CacheKey, CacheTTL, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ValidationPipe } from './../pipes/validation.pipe';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './../auth/auth.guard';


@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService) {}

    //GET request
    @UseInterceptors(CacheInterceptor)
    @CacheKey('Get all users')
    @CacheTTL(300)
    @UseGuards(JwtAuthGuard)
    //@MessagePattern('Getting all users...')
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    //GET request by ID
    @UseInterceptors(CacheInterceptor)
    @CacheKey('Get user by ID')
    @CacheTTL(300)
    @UseGuards(JwtAuthGuard)
    //@MessagePattern('Getting by ID...')
    @Get(':id')
    getOneById(@Param('id') id: any) {
        return this.usersService.getUserById(id) //id.text
    }

    //GET Request by Email
    @UseInterceptors(CacheInterceptor)
    @CacheKey('Get user by email')
    @CacheTTL(300)
    @UseGuards(JwtAuthGuard)
    //@MessagePattern('Getting by email...')
    @Get('/email/:email')
    getOneByEmail(@Param('email') email: any) {
        return this.usersService.getUserByEmail(email) //email.text
    }


    //POST Request
    @UsePipes(ValidationPipe)
    //@MessagePattern('POST request by user...')
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }
    

    //DELETE request by ID
    @UseInterceptors(CacheInterceptor)
    @CacheKey('Delete user by ID')
    @CacheTTL(300)
    @UseGuards(JwtAuthGuard)
    //@MessagePattern('DELETE request by user...')
    @Delete(':id')
    remove(@Param('id') id: any) {
        return this.usersService.removeUser(id) //id.text
    }


    //PUT request by ID
    @UsePipes(ValidationPipe)
    //@MessagePattern('PUT request by user...')
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() userDto: UpdateUserDto) { //message: any
        return this.usersService.updateUser(userDto, id) //message.text, message.text1
    }


}


