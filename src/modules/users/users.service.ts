import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async createUser(payload: Partial<User>) {
    const userInstance = this.userRepository.create(payload);

    const userInfo = await this.userRepository.save(userInstance);
    return ({
      id: userInfo.id
    });
  }

  findUserDetail(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findusers(name: string) {
    if (!name) {
      return this.userRepository.find()
    }
    return this.userRepository.findBy([
      { firstName: ILike(`%${name}%`) },
      { middleName: ILike(`%${name}%`) },
      { lastName: ILike(`%${name}%`) }
    ]);
  }
}
