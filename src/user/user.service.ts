import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import { Repository } from "typeorm";
import {UserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
  }

  async getAllUsers():Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser(userDto: UserDto):Promise<UserEntity> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string):Promise<UserEntity> {
    const user = await this.userRepository.findOne({email});
    return user;
  }

  async getUserById(id: number):Promise<UserEntity> {
    const user = await this.userRepository.findOne({id});
    return user;
  }
}
