import { Controller, Post, Get, Patch, Put, Delete, Body, Param, Query, NotFoundException, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/createUser.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {

  }
/**
 * CREATE USER
 * @param payload Object
 * @returns Object
 */
  @Post("/create")
  createVehicleCategories(@Body() payload: createUserDto) {
    return this.userService.createUser(payload)
  }

  /**
   * USER LIST
   * @param name String
   * @returns Array
   */
  @UseInterceptors(SerializeInterceptor)
  @Get("/list")
  listVehicleCategories(@Query("name") name: string) {
    return this.userService.findusers(name);
  }

  /**
   * USER DETAILS
   * @param userId Srting
   * @returns Object
   */
  @UseInterceptors(SerializeInterceptor)
  @Get("/:userId")
  detailVehicleCategories(@Param("userId") userId: string) {
    return this.userService.findUserDetail(userId);
  }

  /**
   * USER UDPATE
   * @param userId String
   * @param payload Object
   * @returns Object
   */
  @Patch("/:userId/update")
  updateUser(@Param("userId") userId: string, @Body() payload: createUserDto) {
    return this.userService.updateUser(userId, payload);
  }

  /**
   * USER SOFT DELETE
   * @param userId String
   * @returns Object
   */
  @Patch("/:userId/delete")
  deleteUser(@Param("userId") userId: string) {
    const softDeletepayload = {
      isDeleted: true
    }
    return this.userService.updateUser(userId, softDeletepayload);
  }

  /**
   * USER HARD DELETE
   * @param userId String
   * @returns Object
   */
  @Delete("/:userId/delete")
  removeVehicleCategories(@Param("userId") userId: string) {
    return this.userService.removeUser(userId);
  }
}
