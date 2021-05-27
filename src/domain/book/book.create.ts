import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { Book } from './book';
import { IBookDomain } from './book-domain.interface';

const BookRepo = () => Inject('BookRepo');

@Injectable()
export class BookCreate {
  constructor(@BookRepo() private readonly bookRepository: IBookDomain) {}

  public async Create(book: Partial<Book>): Promise<Book> {
    const { code } = book;

    const cekCodeBook = await this.bookRepository.BookGetByCode(code);
    if (cekCodeBook) {
      throw new HttpException('Code book already use.', HttpStatus.CONFLICT);
    }

    const newBook = {
      ...book,
      stock: 1,
      borrowedStatus: false,
      borrowedBy: '-',
    };
    return await this.bookRepository.BookCreate(newBook);
  }

  public async CreateMany(books: Array<Book>) {
    await this.bookRepository.BookCreateMany(books);
  }
}
