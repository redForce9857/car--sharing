import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {MaxRentalDayEntity} from "./entities/maxRentalDay.entity";
import {TariffEntity} from "./entities/tarrif.entity";
import {SaleEntity} from "./entities/sale.entity";
import {CarEntity} from "../car/entities/car.entity";
import {Repository} from "typeorm";
import {CreateAdminDto} from "./dto/create.admin.dto";
import {MaxRentalDayDto} from "./dto/maxRentalDay.dto";
import {CreateSaleDto} from "./dto/create.sale.dto";
import {CreateTarrifDto} from "./dto/create.tarrif.dto";

@Injectable()
export class AdminResurceService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
              @InjectRepository(MaxRentalDayEntity) private readonly maxRentalDayRepository: Repository<MaxRentalDayEntity>,
              @InjectRepository(SaleEntity) private readonly saleRepository: Repository<SaleEntity>,
              @InjectRepository(TariffEntity) private readonly tariffRepository: Repository<TariffEntity>,
              @InjectRepository(CarEntity) private readonly carRepository: Repository<CarEntity>,) {
  }

  async getAdmin(): Promise<UserEntity[]>{
    return this.userRepository.find({
      where: {
        isAdmin: true
      }
    })
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<UserEntity>{
    const admin = await this.userRepository.findOne({
      username: createAdminDto.username
    })

    if (admin) {
      throw new HttpException('User already exists', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const newAdmin = new UserEntity()
    Object.assign(newAdmin, createAdminDto)
    return await this.userRepository.save(newAdmin)
  }

  async setMaxRentalday(maxRentalDayDto: MaxRentalDayDto): Promise<MaxRentalDayEntity>{
    const maxDay = await this.maxRentalDayRepository.findOne({id:1})
    if (!maxDay){
      const newMaxDay = new MaxRentalDayEntity()
      Object.assign(newMaxDay, maxRentalDayDto)
      return await this.maxRentalDayRepository.save(newMaxDay)
    }
  }

  async createSale(createSaleDto: CreateSaleDto):Promise<SaleEntity>{
    const sale = await this.saleRepository.findOne({
      description: createSaleDto.description
    })
    if (sale){
      throw new HttpException('Sale already exists', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const newSale = new SaleEntity()
    Object.assign(newSale, createSaleDto);
    return await this.saleRepository.save(newSale);
  }

  async createTarrif(createTarrifDto: CreateTarrifDto):Promise<TariffEntity>{
    const tarrif = await this.saleRepository.findOne({
      description: createTarrifDto.description
    })
    if (tarrif){
      throw new HttpException('Tarrif already exists', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const newTarrif = new TariffEntity()
    Object.assign(newTarrif, createTarrifDto);
    return await this.saleRepository.save(newTarrif);
  }
}
