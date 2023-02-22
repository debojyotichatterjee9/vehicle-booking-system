import { Controller, Post, Get, Patch, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/createUser.dto';
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {

    }
    @Post("/")
  createVehicleCategories(@Body() payload: createUserDto) {
    return this.userService.createUser(payload)
  }
}
