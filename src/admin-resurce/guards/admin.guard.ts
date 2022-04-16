import {CanActivate, ExecutionContext, HttpException, HttpStatus} from "@nestjs/common";
import {Observable} from "rxjs";
import {ExpressRequestInterface} from "../../types/expressRequest.interface";


export class AdminGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<ExpressRequestInterface>()
        if (request.user){
            if (request.user.isAdmin){
                return  true;
            }
            throw new HttpException('You are not an admin', HttpStatus.FORBIDDEN)
        }
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
    }
}