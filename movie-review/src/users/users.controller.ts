import { Controller, Get, Param, Delete, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}
    @Get()
    getAllUsers () {
        return this.userService.findAll()
    }

    @Get(':username')
    getUser(@Param('username') username:string) {
        return this.userService.findOne(username);
    }

    @Delete(":id")
    removeUser(@Param('id') id: number) {
        this.userService.remove(id);
        return null;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}

