import { Module } from '@nestjs/common';
import {TariffsService} from "./tariff.service";
import {TariffsController} from "./tariff.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {TariffsEntity} from "./entities/tariff.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TariffsEntity])],
    providers: [TariffsService],
    controllers: [TariffsController],
    exports: [TariffsService]
})
export class TariffsModule {}
