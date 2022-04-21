import { forwardRef, Module } from "@nestjs/common";
import {UsersController} from "./user.controller";
import {UsersService} from "./user.service";
import {UserEntity} from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
