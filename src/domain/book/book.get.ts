import { Injectable, Inject } from '@nestjs/common';

import { Book } from './book';
import { IBookDomain } from './book-domain.interface';

const BookRepo = () => Inject('BookRepo');

@Injectable()
export class BookGet {
  constructor(@BookRepo() private readonly bookRepository: IBookDomain) {}

  public async GetAll(): Promise<Book> {
    return this.bookRepository.GetAll();
  }

  public async GetAvailable(): Promise<Book> {
    return this.bookRepository.GetAvailable();
  }

  public async GetById(_id: string): Promise<Book> {
    return this.bookRepository.GetById(_id);
  }
}
