import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import {RentsService} from "./rentals.service";
import {RentsEntity} from "./entities/rental.entity";
import {AuthGuard} from "../auth/guards/admin.guard";
import RentDto from "./dto/create-rental.dto";

@Controller('rents')
export class RentsController {
  constructor(private rentsService: RentsService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  createRent(@Request() request):Promise<RentsEntity> {
    const rentDto: RentDto = {userId: request.user.id, ...request.body};
    return this.rentsService.createRent(rentDto);
  }
}
