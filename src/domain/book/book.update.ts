import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { Book } from './book';
import { IBookDomain } from './book-domain.interface';

const BookRepo = () => Inject('BookRepo');

@Injectable()
export class BookUpdate {
  constructor(
    @BookRepo() private readonly bookRepository: IBookDomain,
    @Inject('Helpers') private readonly helpers,
  ) {}

  public async UpdateById(
    _id: string,
    updatedFields: Partial<Book>,
  ): Promise<Book> {
    const session = await this.helpers.transaction.startTransaction();
    try {
      const result = await this.bookRepository.BookUpdateById(
        _id,
        updatedFields,
        session,
      );

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
}
