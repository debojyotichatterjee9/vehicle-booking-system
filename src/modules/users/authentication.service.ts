import { Injectable } from "@nestjs/common";
import { UsersService } from './users.service';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) { }

  signUp() {

  }

  /**
  *
    */
  login() {

  }
}
