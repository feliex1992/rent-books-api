import {
  Controller,
  HttpStatus,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReturnCreate } from 'src/domain/return/return-book.create';
import { CreateDTO } from './dto/create.dto';

@ApiTags('return')
@Controller('return')
export class ReturnController {
  constructor(private readonly returnCreate: ReturnCreate) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async Create(@Body() returnBook: CreateDTO): Promise<HttpStatus> {
    return await this.returnCreate.Create(returnBook);
  }
}
