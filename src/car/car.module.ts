import { Module } from '@nestjs/common';
import {CarsController} from "./car.controller";
import {CarsService} from "./car.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {CarEntity} from "./entities/car.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity])],
  providers: [CarsService],
  controllers: [CarsController],
  exports: [CarsService]
})
export class CarsModule {}
