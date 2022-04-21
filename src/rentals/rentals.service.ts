import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {RentsEntity} from "./entities/rental.entity";
import { Repository } from "typeorm";
import RentDto from "./dto/create-rental.dto";
import {UsersService} from "../user/user.service";
import {TariffsService} from "../tariffs/tariff.service";
import {CarsService} from "../car/car.service";
import {DiscountsService} from "../discounts/discount.service";
import {DiscountEntity} from "../discounts/entities/discount.entity";
import RentValidator from "./validator/rentals.validator";

@Injectable()
export class RentsService {
  constructor(
      @InjectRepository(RentsEntity) private rentsRepository: Repository<RentsEntity>,
      private usersService: UsersService,
      private tariffsService: TariffsService,
      private carsService: CarsService,
      private discountsService: DiscountsService,
      private rentValidator: RentValidator
  ) {}

  async createRent(rentDto: RentDto):Promise<any> {
    try {
      const period = this.getPeriod(rentDto.from, rentDto.to);
      this.rentValidator.rentCreateValidator(rentDto.from, rentDto.to, period);
      const discount = await this.getRentDiscount(period);
      const car = await this.carsService.getCarById(rentDto.carId);
      const tariff = await this.tariffsService.getTariffById(rentDto.tariffId);
      const user = await this.usersService.getUserById(rentDto.userId);

      const payment = this.calculatePayment(period, tariff.price, discount?.discount);

      const rent = this.rentsRepository.create({...rentDto, discount, car, tariff, user, payment})
      return this.rentsRepository.save(rent);
    } catch (error) {
      throw error;
    }
  }

  async getRentsCountByUserId(userId: number) {
    const [{ count }] = await this.rentsRepository.query(`
        SELECT count(id) from "Rents" WHERE "userId" = ${userId} 
    `);
    return Number(count);
  }

  async getTotalPaymentByUserId(userId: number) {
    const [{ sum }] = await this.rentsRepository.query(`
      SELECT sum(payment) from "Rents" WHERE "userId" = ${userId}
    `);
    return Number(sum);
  }

  private async getRentDiscount(period):Promise<DiscountEntity> {
    const discount = await this.discountsService.getDiscountByPeriod(period);
    return discount;
  }

  private getPeriod(from, to): number {
    const dateDifference = Number(new Date(to)) - Number(new Date(from));
    const period = dateDifference / (1000 * 60 * 60 * 24);

    return period;
  }

  private calculatePayment(period, tariffPrice, discount):number {
    const payment = period * tariffPrice;

    if (!discount) return payment;

    return (payment * (100 - discount)) / 100;
  }


}
