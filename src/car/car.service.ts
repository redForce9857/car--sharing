import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {CarEntity} from "./entities/car.entity";
import {Repository} from "typeorm";

@Injectable()
export class CarService {
  constructor(@InjectRepository(CarEntity) private readonly carRepo: Repository<CarEntity>) {}

  async create(createCarDto: CreateCarDto): Promise<CarEntity> {
    Object.assign(createCarDto)
   return await this.carRepo.save(createCarDto)
  }

  async findAll(): Promise<CarEntity[]> {
    return await this.carRepo.find()
  }

  async findOne(id: number): Promise<CarEntity> {
    return await this.carRepo.findOne(id)
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<CarEntity>{
    const carUpdate = await this.carRepo.findOne(id)
    if (!carUpdate){
      throw new HttpException('the user not found', HttpStatus.NOT_FOUND)
    }
    Object.assign(carUpdate, updateCarDto);
    return await this.carRepo.save(carUpdate)
  }

  async remove(id: number){
    return await this.carRepo.delete(id)
  }
}
