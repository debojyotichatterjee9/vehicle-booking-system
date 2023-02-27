import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from './users.service';
import { User } from "./users.entity";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

type signUpPayloadType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

type signInPayloadType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};
@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) { }

  async signUp(payload: signUpPayloadType) {

    //check email
    const userInfo = await this.usersService.findUserByEmail(payload.email);
    if (userInfo) {
      throw new BadRequestException("This email address is already in use!!!")
    }
    // create new user
    const saltKey = randomBytes(8).toString('hex');
    const hash = await scrypt(payload.password, saltKey, 32) as Buffer;
    const secretHash = hash.toString('hex');

    Object.assign(payload, {
      saltKey: saltKey,
      secretHash: secretHash
    });

    const newUserInfo = await this.usersService.createUser(payload)

    return newUserInfo;
    //return response
  }




  signIn(payload: signInPayloadType) {

  }
}
