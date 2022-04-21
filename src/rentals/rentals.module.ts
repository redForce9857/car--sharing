import { Module } from '@nestjs/common';
import {RentsController} from "./rentals.controller";
import {RentsService} from "./rentals.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {RentsEntity} from "./entities/rental.entity";
import { AuthModule } from "../auth/auth.module";
import {UsersModule} from "../user/user.module";
import {CarsModule} from "../car/car.module";
import {TariffsModule} from "../tariffs/tariff.module";
import {DiscountsModule} from "../discounts/discount.module";
import RentValidator from "./validator/rentals.validator";

@Module({
  imports: [
    TypeOrmModule.forFeature([RentsEntity]),
    AuthModule,
    CarsModule,
    UsersModule,
    TariffsModule,
    DiscountsModule
  ],
  controllers: [RentsController],
  providers: [RentsService, RentValidator],
  exports: [RentsService]
})
export class RentsModule {}
