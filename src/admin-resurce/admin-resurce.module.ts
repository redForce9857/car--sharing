import { Module } from '@nestjs/common';
import { AdminResurceService } from './admin-resurce.service';
import { AdminResurceController } from './admin-resurce.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TariffEntity} from "./entities/tarrif.entity";
import {UserEntity} from "../user/entities/user.entity";
import {SaleEntity} from "./entities/sale.entity";
import {CarEntity} from "../car/entities/car.entity";
import {MaxRentalDayEntity} from "./entities/maxRentalDay.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TariffEntity, SaleEntity, CarEntity, MaxRentalDayEntity])],
  controllers: [AdminResurceController],
  providers: [AdminResurceService]
})
export class AdminResurceModule {}
