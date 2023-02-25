import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  /**
   * CREATE USER
   * @param payload Object
   * @returns Object
   */
  async createUser(payload: Partial<User>) {
    const userInstance = this.userRepository.create(payload);

    const userInfo = await this.userRepository.save(userInstance);
    return userInfo;
  }


  /**
   * USER LIST
   * @param name String
   * @returns Array
   */
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

  /**
   * USER DETAILS
   * @param id String
   * @returns Object
   */
  findUserDetail(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * USER UPDATE
   * @param id String
   * @param payload Object
   * @returns Object
   */
  async updateUser(id: string, payload: Partial<User>) {
    const userInfo = await this.userRepository.findOneBy({ id });
    if (!userInfo) {
      throw new NotFoundException("This user does not Exist!!!")
    }
    Object.assign(userInfo, payload)
    const updatedUser = await this.userRepository.save(userInfo);
    return updatedUser;
  }

  /**
   * USER DELETE
   * @param id String
   * @returns Object
   */
  async removeUser(id: string) {
    const userInfo = await this.userRepository.findOneBy({ id });
    if (!userInfo) {
      throw new NotFoundException("This user does not Exist!!!")
    }
    const removedUser = await this.userRepository.remove(userInfo);
    return ({
      deleted_status: true
    });
  }
}
