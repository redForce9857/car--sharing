import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export default class RentValidator {
    rentCreateValidator(from, to, period) {
        if (period > 30) throw new HttpException('Period can be only less than 31 day', HttpStatus.BAD_REQUEST);
        const toDay = new Date(to).getDay();
        const fromDay = new Date(from).getDay();

        if (toDay === 5 || toDay === 6 || fromDay === 5 || fromDay === 6) throw new HttpException('Your rent should start and end on working days', HttpStatus.BAD_REQUEST);
    }
}