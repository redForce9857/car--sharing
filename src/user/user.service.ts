import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserEntity} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {sign} from "jsonwebtoken"
import {UserResponseInterface} from "./types/userResponse.interface";
import {LoginUserDto} from "./dto/login-user.dto";
import {compare} from 'bcrypt';
import {JWT_TOKEN} from "../config";
import {watch} from "fs/promises";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
  }
  async create(createUserDto: CreateUserDto): Promise<UserEntity>{
    const userByEmailCheck = await this.userRepo.findOne({
      email: createUserDto.email,
    })
    const userByUsernameCheck = await this.userRepo.findOne({
      username: createUserDto.username,
    })
    if (userByEmailCheck || userByUsernameCheck){
      throw new HttpException('Email or Username are taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto)
    return await this.userRepo.save(newUser);
  }

  generateJwt(user: UserEntity): string{
    return sign({
      id: user.id,
      username: user.username,
      email: user.email,
    }, JWT_TOKEN);
  }

  buildUserResponse(user: UserEntity): UserResponseInterface{
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity>{
    const userLogin = await this.userRepo.findOne({
        email: loginUserDto.email
    },
        {select: ['id', 'username', 'email', 'bio', 'password']})
    if (!userLogin){
      throw new HttpException('Credential is not valid', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const isPasswordCorrect = await compare(loginUserDto.password, userLogin.password)
    if (!isPasswordCorrect){
      throw new HttpException('Credential is not valid', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    delete userLogin.password
    return userLogin
  }




















  findAll() {
    return `This action returns all user`;
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepo.findOne(id)
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(userId)
    if (!user){
      throw new HttpException('the user not found', HttpStatus.NOT_FOUND)
    }
    Object.assign(user, updateUserDto);
    return await this.userRepo.save(user)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
