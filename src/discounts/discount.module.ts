import { Module } from '@nestjs/common';
import {DiscountsService} from "./discount.service";
import {DiscountsController} from "./discount.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {DiscountEntity} from "./entities/discount.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DiscountEntity])],
    providers: [DiscountsService],
    controllers: [DiscountsController],
    exports: [DiscountsService]
})
export class DiscountsModule {}
