import {
  Controller,
  HttpStatus,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BorrowCreate } from 'src/domain/borrow/borrow.create';
import { CreateDTO } from './dto/create.dto';

@ApiTags('borrow')
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowCreate: BorrowCreate) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async Create(@Body() borrow: CreateDTO): Promise<HttpStatus> {
    return await this.borrowCreate.Create(borrow);
  }
}
