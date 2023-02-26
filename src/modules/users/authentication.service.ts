import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from './users.service';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) { }

  async signUp(email: string, password: string) {

    //check email
    const userInfo = await this.usersService.findUserByEmail(email);
    if (userInfo) {
      throw new BadRequestException("This email address is already in use!!!")
    }
    // create new user



    //return response
  }




  login() {

  }
}
