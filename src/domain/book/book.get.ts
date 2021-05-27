import { Injectable, Inject } from '@nestjs/common';

import { Book } from './book';
import { IBookDomain } from './book-domain.interface';

const BookRepo = () => Inject('BookRepo');

@Injectable()
export class BookGet {
  constructor(@BookRepo() private readonly bookRepository: IBookDomain) {}

  public async GetAll(): Promise<Book> {
    return this.bookRepository.BookGetAll();
  }

  public async GetAvailable(): Promise<Book> {
    return this.bookRepository.BookGetAvailable();
  }

  public async GetById(_id: string): Promise<Book> {
    return this.bookRepository.BookGetById(_id);
  }
}
