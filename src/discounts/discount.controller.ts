import { Body, Controller, Get, Post } from "@nestjs/common";
import {DiscountsService} from "./discount.service";
import DiscountDto from "./dto/discount.dto";
import {DiscountEntity} from "./entities/discount.entity";

@Controller('discounts')
export class DiscountsController {
    constructor(private discountsService: DiscountsService) {
    }

    @Get()
    getAllDiscounts():Promise<DiscountEntity[]> {
        return this.discountsService.getAllDiscounts();
    }

    @Post()
    createDiscount(@Body() discountDto: DiscountDto):Promise<DiscountEntity> {
        return this.discountsService.createDiscount(discountDto);
    }
}
