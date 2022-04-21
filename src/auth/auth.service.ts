import { Injectable, UnauthorizedException } from "@nestjs/common";
import {UsersService} from "../user/user.service";
import {UserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async registration(userDto: UserDto) {
    const user = await this.usersService.createUser(userDto);
    return JSON.stringify(user);
  }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return JSON.stringify(user);
  }


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

}
