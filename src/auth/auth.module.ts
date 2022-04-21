import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import {UsersModule} from "../user/user.module";
import {AuthGuard} from "./guards/admin.guard";

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}
