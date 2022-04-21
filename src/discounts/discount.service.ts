import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {DiscountEntity} from "./entities/discount.entity";
import { Repository } from "typeorm";
import DiscountDto from "./dto/discount.dto";

@Injectable()
export class DiscountsService {
    constructor(@InjectRepository(DiscountEntity) private discountRepository: Repository<DiscountEntity>) {
    }

    getAllDiscounts():Promise<DiscountEntity[]> {
        return this.discountRepository.find();
    }

    createDiscount(discountDto: DiscountDto):Promise<DiscountEntity> {
        const discount = this.discountRepository.create(discountDto);
        return this.discountRepository.save(discount);
    }

    async getDiscountByPeriod(period: number) {
        const discounts = await this.discountRepository.query(`SELECT * FROM "Discounts" WHERE "Discounts".from <= ${period} AND "Discounts".to >= ${period}`);
        return discounts[0];
    }
}
