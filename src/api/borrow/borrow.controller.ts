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
import { BorrowCreateDTO } from './dto/borrow-create.dto';

@ApiTags('borrow')
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowCreate: BorrowCreate) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async Create(@Body() borrow: BorrowCreateDTO): Promise<HttpStatus> {
    return await this.borrowCreate.Create(borrow);
  }
}
