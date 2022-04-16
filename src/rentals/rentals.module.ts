import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RentalEntity} from "./entities/rental.entity";
import {SaleEntity} from "../admin-resurce/entities/sale.entity";
import {UserEntity} from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RentalEntity, SaleEntity, UserEntity])],
  controllers: [RentalsController],
  providers: [RentalsService]
})
export class RentalsModule {}
