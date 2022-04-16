import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateRentalDto} from './dto/create-rental.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {RentalEntity} from "./entities/rental.entity";
import {DeleteResult, Repository} from "typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {RentalResponseInterface} from "./types/rentalResponce.interface";
import {SaleEntity} from "../admin-resurce/entities/sale.entity";

@Injectable()
export class RentalsService {
  constructor(@InjectRepository(RentalEntity) private readonly rentalServiceRepo: Repository<RentalEntity>,
              @InjectRepository(SaleEntity) private readonly saleRepository: Repository<SaleEntity>,
              @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async getRentals(): Promise<RentalEntity[]> {
    return await this.rentalServiceRepo.find()
  }

  async getActiveRentals(): Promise<RentalEntity[]> {
    const rentals = await this.rentalServiceRepo.find({
      order: {
        rentalDate: "DESC"
      }
    })
    return rentals.filter((rental) => rental.rentalDate.setDate(rental.rentalDate.getDate() + rental.rentalDay) > (new Date()).setDate((new Date()).getDate() + 0))
  }

  async createRental(user: UserEntity, createRentalDto: CreateRentalDto): Promise<RentalEntity> {
    const rental = await this.rentalServiceRepo.findOne()

    if (rental) {
      throw new HttpException('Rental already exists', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    user.canRental = new Date()
    user.canRental.setDate(user.canRental.getDate() + 3)
    const newRental = new RentalEntity()
    Object.assign(newRental, createRentalDto)
    newRental.user = user
    await this.rentalServiceRepo.save(user)
    return await this.rentalServiceRepo.save(newRental)
  }

  async deleteRental(userId: number, id: number): Promise<DeleteResult> {
    const rental = await this.rentalServiceRepo.findOne({ id })

    if (!rental) {
      throw new HttpException('Rental does not exists', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    if(rental.user.id !== userId) {
      throw new HttpException('The rental does not belong to you', HttpStatus.FORBIDDEN)
    }
    return await this.rentalServiceRepo.delete(rental)
  }

  async buildRentalResponse(rental: RentalEntity): Promise<RentalResponseInterface> {
    const sales = await this.saleRepository.find()
    const [saleEntity] = sales.filter((sale) => sale.from <= rental.rentalDay && sale.to >= rental.rentalDay)
    const sale = saleEntity.percentages
    const total = rental.tariff.cost * rental.rentalDay * sale / 100
    return {
      ...rental,
      total
    }

  }
}
