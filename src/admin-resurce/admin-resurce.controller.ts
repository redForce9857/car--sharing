import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { AdminResurceService } from './admin-resurce.service';
import {AdminGuard} from "./guards/admin.guard";
import {UserEntity} from "../user/entities/user.entity";
import {CreateAdminDto} from "./dto/create.admin.dto";
import {MaxRentalDayDto} from "./dto/maxRentalDay.dto";
import {MaxRentalDayEntity} from "./entities/maxRentalDay.entity";
import {CreateTarrifDto} from "./dto/create.tarrif.dto";
import {TariffEntity} from "./entities/tarrif.entity";
import {CreateSaleDto} from "./dto/create.sale.dto";
import {SaleEntity} from "./entities/sale.entity";

@Controller('admin')
export class AdminResurceController {
  constructor(private readonly adminResurceService: AdminResurceService) {}

  @Get()
  @UseGuards(AdminGuard)
  async getAdmins(): Promise<UserEntity[]> {
    return await this.adminResurceService.getAdmin()
  }

  @Post()
  @UseGuards(AdminGuard)
  async createAdmin(@Body() creatAdminDto: CreateAdminDto): Promise<UserEntity> {
    return await this.adminResurceService.createAdmin(creatAdminDto)
  }

  @Post('maxrentalday')
  @UseGuards(AdminGuard)
  async setMaxRentalDay(@Body() maxRentalDayDto: MaxRentalDayDto): Promise<MaxRentalDayEntity> {
    return await this.adminResurceService.setMaxRentalday(maxRentalDayDto)
  }

  @Post('sale')
  @UseGuards(AdminGuard)
  async createSale(@Body() createSaleDto: CreateSaleDto): Promise<SaleEntity> {
    return await this.adminResurceService.createSale(createSaleDto)
  }

  @Post('tariff')
  @UseGuards(AdminGuard)
  async createTariff(@Body() createTariffDto: CreateTarrifDto): Promise<TariffEntity> {
    return await this.adminResurceService.createTarrif(createTariffDto)
  }
}
