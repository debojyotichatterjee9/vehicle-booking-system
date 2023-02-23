import { Controller, Post, Get, Patch, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/createUser.dto';
@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) {

    }
    @Post("/create")
  createVehicleCategories(@Body() payload: createUserDto) {
    return this.userService.createUser(payload)
  }

  @Get("/list")
  listVehicleCategories(@Query("name") name: string) {
    return this.userService.findusers(name);
  }

  @Get("/:userId")
  detailVehicleCategories(@Param("userId") userId: string) {
    return this.userService.findUserDetail(userId);
  }
}
