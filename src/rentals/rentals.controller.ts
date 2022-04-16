import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import {AuthGuard} from "../user/guards/auth.guards";
import {User} from "../user/decorators/user.decorator";
import {DeleteResult} from "typeorm";
import {RentalResponseInterface} from "./types/rentalResponce.interface";
import {UserEntity} from "../user/entities/user.entity";
import {RentalGuards} from "./guards/rental.guards";
import {RentalEntity} from "./entities/rental.entity";

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get('car-sharing/rentals')
  async getRentals(): Promise<RentalEntity[]> {
    return await this.rentalsService.getRentals()
  }

  @Get('car-sharing/activerentals')
  async getActiveRentals(): Promise<RentalEntity[]> {
    return await this.rentalsService.getActiveRentals()
  }

  @Post('car-sharing/rental')
  @UseGuards(AuthGuard, RentalGuards)
  async createRental(@User() user: UserEntity, @Body() createRentalDto: CreateRentalDto): Promise<RentalResponseInterface> {
    const rental = await this.rentalsService.createRental(user, createRentalDto)
    return await this.rentalsService.buildRentalResponse(rental)
  }

  @Delete('car-sharing/rental/:id')
  @UseGuards(AuthGuard)
  async deleteRental(@User('id') userId: number, @Param('id') id: number): Promise<DeleteResult> {
    return await this.rentalsService.deleteRental(userId, id)
  }
}
