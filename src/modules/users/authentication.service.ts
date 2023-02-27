import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
  email: string;
  password: string;
};
@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) { }

  async signUp(payload: signUpPayloadType) {

    //check if user already exists with the email
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
  }




  async signIn(payload: signInPayloadType) {

    const userInfo = await this.usersService.findUserByEmail(payload.email);
    if (!userInfo) {
      throw new NotFoundException("This email address does not exist!!!");
    }
    const [saltKey, secretHash] = [userInfo.saltKey, userInfo.secretHash];

    const generatedHashBuff = await scrypt(payload.password, saltKey, 32) as Buffer;
    const generatedHash = generatedHashBuff.toString('hex');

    if(generatedHash === secretHash) {
      return userInfo
    }
    else {
      throw new UnauthorizedException("Username or password is incorrect!!!")
    }
  }
}
