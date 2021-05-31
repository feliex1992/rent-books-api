import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { Book } from './book';
import { IBookDomain } from './book-domain.interface';

const BookRepo = () => Inject('BookRepo');

@Injectable()
export class BookCreate {
  constructor(
    @BookRepo() private readonly bookRepository: IBookDomain,

    // Individual Import VS Core Imports (Choose ONE)
    @Inject('Helpers') private readonly helpers,
  ) {}

  public async Create(book: Partial<Book>): Promise<Book> {
    const { code } = book;

    const cekCodeBook = await this.bookRepository.BookGetByCode(code);
    if (cekCodeBook) {
      throw new HttpException('Code book already use.', HttpStatus.CONFLICT);
    }

    const session = await this.helpers.transaction.startTransaction();

    try {
      const newBook = {
        ...book,
        stock: 1,
        borrowedStatus: false,
        borrowedBy: '-',
        borrowedDate: '-',
      };
      const result = await this.bookRepository.BookCreate(newBook, session);

      await this.helpers.transaction.commitTransaction(session);
      return result;
    } catch (err) {
      await this.helpers.transaction.rollbackTransaction(session);
      throw new HttpException(
        { err: err.message || err },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async CreateMany(books: Array<Book>) {
    await this.bookRepository.BookCreateMany(books);
  }
}
