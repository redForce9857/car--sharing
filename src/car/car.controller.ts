import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {AuthGuard} from "../user/guards/auth.guards";

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('car-sharing/car')
  @UsePipes(new ValidationPipe())
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get('car-sharing/cars')
  findAll() {
    return this.carService.findAll();
  }

  @Get('car-sharing/car/:id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch('car-sharing/car/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete('car-sharing/car/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
