import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {CarEntity} from "./entities/car.entity";
import { Repository } from "typeorm";
import CarDto from "./dto/create-car.dto";

@Injectable()
export class CarsService {
  constructor(@InjectRepository(CarEntity) private carRepository: Repository<CarEntity>) {}

  getAllCars():Promise<CarEntity[]> {
    return this.carRepository.find();
  }

  createCar(carDto: CarDto):Promise<CarEntity> {
    const car = this.carRepository.create(carDto);
    return this.carRepository.save(car);
  }

  async getCarById(id: number):Promise<CarEntity> {
    return this.carRepository.findOne({id});
  }
}
