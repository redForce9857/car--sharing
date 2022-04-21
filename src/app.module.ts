import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import {TariffsModule} from "./tariffs/tariff.module";
import {TariffsEntity} from "./tariffs/entities/tariff.entity";
import {DiscountsModule} from "./discounts/discount.module";
import {DiscountEntity} from "./discounts/entities/discount.entity";
import {CarsModule} from "./car/car.module";
import {CarEntity} from "./car/entities/car.entity";
import { AuthModule } from './auth/auth.module';
import {UsersModule} from "./user/user.module";
import {UserEntity} from "./user/entities/user.entity";
import {RentsModule} from "./rentals/rentals.module";
import {RentsEntity} from "./rentals/entities/rental.entity";
// import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'redForce',
      database: 'car-sharing',
      entities: [TariffsEntity, DiscountEntity, CarEntity, UserEntity, RentsEntity],
      synchronize: true,
    }),
    TariffsModule,
    DiscountsModule,
    CarsModule,
    AuthModule,
    UsersModule,
    RentsModule,
    // StatisticsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
