import {
  Controller,
  Logger,
  Get,
  Param,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BOOKS } from 'src/statics';
import { BookGet } from 'src/domain/book/book.get';
import { BookCreate } from 'src/domain/book/book.create';
import { BookUpdate } from 'src/domain/book/book.update';
import { BookDelete } from 'src/domain/book/book.delete';
import { Book } from 'src/domain/book/book';
import { BookCreateDTO } from './dto/book-create.dto';
import { BookUpdateDTO } from './dto/book-update.dto';

@ApiTags('book')
@Controller('book')
export class BookController {
  private logger = new Logger('Book Controller');

  constructor(
    private readonly bookGet: BookGet,
    private readonly bookCreate: BookCreate,
    private readonly bookUpdate: BookUpdate,
    private readonly bookDelete: BookDelete,
  ) {
    this.patchData();
  }

  async patchData() {
    const book = await this.bookGet.GetAll();
    if (!book[0]) {
      this.logger.log('Start Create Many Books.');
      await this.bookCreate.CreateMany(BOOKS);
    }
  }

  @Get('all')
  public async Get(): Promise<Book> {
    return await this.bookGet.GetAll();
  }

  @Get('available')
  public async GetAvailable(): Promise<Book> {
    return await this.bookGet.GetAvailable();
  }

  @Get('by-id/:_id')
  public async GetByCode(@Param('_id') _id: string): Promise<Book> {
    return await this.bookGet.GetById(_id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async Create(@Body() book: BookCreateDTO): Promise<Book> {
    return await this.bookCreate.Create(book);
  }

  @Put('by-id/:_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async Update(
    @Param('_id') _id: string,
    @Body() book: BookUpdateDTO,
  ): Promise<Book> {
    return await this.bookUpdate.UpdateById(_id, book);
  }

  @Delete('by-id/:_id')
  public async DeleteById(@Param('_id') _id: string): Promise<Book> {
    return await this.bookDelete.DeleteById(_id);
  }
}
