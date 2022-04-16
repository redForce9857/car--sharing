import {CanActivate, ExecutionContext, HttpException, HttpStatus} from "@nestjs/common";
import {Observable} from "rxjs";
import {ExpressRequestInterface} from "../../types/expressRequest.interface";


export class RentalGuards implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest<ExpressRequestInterface>()
        const rentalBody = new request.body;

        if (request.user.canRental){
            if (request.user.canRental > (new Date())) {
                throw new HttpException(`You can book a car on ${request.user.canRental}`, HttpStatus.FORBIDDEN)
            }
            return true;
        }
        if (rentalBody.rentalDate.getDay() === 0 || rentalBody.rentalDate.getDay() === 6) {
            throw new HttpException('On weekends car sharing is closed', HttpStatus.BAD_REQUEST)
        }

        const endRentalDate = rentalBody.rentalDate.setDate(rentalBody.rentalDate.getDate() + rentalBody.rentalDay)
        if (endRentalDate.getDay() === 0 || endRentalDate.getDay() === 6) {
            throw new HttpException('On weekends car sharing is closed', HttpStatus.BAD_REQUEST)
        }
        return true
    }
}