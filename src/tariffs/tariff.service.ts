import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {TariffsEntity} from "./entities/tariff.entity";
import { Repository } from "typeorm";
import TariffDto from "./dto/tariff.dto";

@Injectable()
export class TariffsService {
    constructor(@InjectRepository(TariffsEntity) private tariffsRepository: Repository<TariffsEntity>) {
    }

    getAllTariffs(): Promise<TariffsEntity[]> {
        return this.tariffsRepository.find();
    }

    async createTariff(tariffDto: TariffDto): Promise<TariffsEntity> {
        try {
            const tariff = await this.tariffsRepository.create(tariffDto);
            return await this.tariffsRepository.save(tariff);
        } catch (e) {
            throw new HttpException('Something went wrong...', HttpStatus.BAD_REQUEST);
        }
    }

    async getTariffById(id):Promise<TariffsEntity> {
        return this.tariffsRepository.findOne({id});
    }
}
