import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CarsService} from "./car.service";
import {CarEntity} from "./entities/car.entity";
import CarDto from "./dto/create-car.dto";

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars():Promise<CarEntity[]> {
    return this.carsService.getAllCars();
  }

  @Get('id')
  getCarById(@Param('id') id: number):Promise<CarEntity>{
    return this.carsService.getCarById(id)
  }

  @Post()
  createCar(@Body() carDto: CarDto):Promise<CarEntity> {
    return this.carsService.createCar(carDto);
  }
}
