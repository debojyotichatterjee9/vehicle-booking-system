import { Controller, Post, Get, Patch, Put, Delete, Body, Param, Query, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { createUserDto } from './dtos/createUser.dto';
import { signInUserDto } from './dtos/signInUser.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReturnUserDto } from './dtos/returnUser.dto';
@Controller('user')
@Serialize(ReturnUserDto)
export class UsersController {
  constructor(private userService: UsersService, private authenticationService: AuthenticationService) {

  }


/**
 * SIGNUP USER
 * @param payload Object
 * @returns Object
 */
@Post("/signup")
signUpUser(@Body() payload: createUserDto) {
  return this.authenticationService.signUp(payload)
}

/**
 * SIGNIN USER
 * @param payload Object
 * @returns Object
 */
@Post("/signin")
signInUser(@Body() payload: signInUserDto) {
  return this.authenticationService.signIn(payload)
}

/**
 * CREATE USER
 * @param payload Object
 * @returns Object
 */
  @Post("/create")
  createUser(@Body() payload: createUserDto) {
    return this.userService.createUser(payload)
  }

  /**
   * USER LIST
   * @param name String
   * @returns Array
   */
  // @Serialize(ReturnUserDto)
  @Get("/list")
  listUser(@Query("name") name: string) {
    return this.userService.findUsers(name);
  }

  /**
   * USER DETAILS
   * @param userId Srting
   * @returns Object
   */
  // @Serialize(ReturnUserDto)
  @Get("/:userId")
  detailUser(@Param("userId") userId: string) {
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
