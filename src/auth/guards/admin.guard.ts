import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import {AuthService} from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}
    async canActivate(context: ExecutionContext ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const candidate = JSON.parse(request.headers.authorization);
            const user = await this.authService.validateUser(candidate.email, candidate.password);
            request.user = user;
            return Boolean(user);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}