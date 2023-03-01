import { Controller, Post, Get, Patch, Put, Delete, Body, Param, Query, Session, Request, UnauthorizedException } from '@nestjs/common';
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
  async signUpUser(@Body() payload: createUserDto, @Session() session: any) {
    const userInfo = await this.authenticationService.signUp(payload);
    session.user_id = userInfo.id;
    return userInfo;
  }

  /**
   * SIGNIN USER
   * @param payload Object
   * @returns Object
   */
  @Post("/signin")
  async signInUser(@Body() payload: signInUserDto, @Session() session: any) {
    const userInfo = await this.authenticationService.signIn(payload);
    session.user_id = userInfo.id;
    console.log(session)
    return userInfo;
  }

  /**
   * SIGNOUT USER
   * @param payload Object
   * @returns Object
   */
  @Post("/signout")
  async signOutUser(@Session() session: any) {
    session.user_id = null;
    console.log(session.user_id)
    return {
      status: "ok"
    };
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
  async listUser(@Query("name") name: string, @Session() session: any) {
    const authUser = await this.userService.findUserDetail(session.user_id)
    console.log(authUser)
    if(authUser) {
      return this.userService.findUsers(name);
    }
    throw new UnauthorizedException("Unauthorized Request!!!")
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
