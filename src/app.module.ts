import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DB_CONFIG} from "../ormconfig";
import {UserModule} from './user/user.module';
import {AuthMiddleware} from "./user/middlewares/auth.middleware";
import { CarModule } from './car/car.module';
import { RentalsModule } from './rentals/rentals.module';
import { AdminResurceModule } from './admin-resurce/admin-resurce.module';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), UserModule, CarModule, RentalsModule, AdminResurceModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
