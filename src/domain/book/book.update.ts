import { Injectable, Inject } from '@nestjs/common';

import { Book } from './book';
import { IBookDomain } from './book-domain.interface';

const BookRepo = () => Inject('BookRepo');

@Injectable()
export class BookUpdate {
  constructor(@BookRepo() private readonly bookRepository: IBookDomain) {}

  public async UpdateById(
    _id: string,
    updatedFields: Partial<Book>,
  ): Promise<Book> {
    return await this.bookRepository.UpdateById(_id, updatedFields);
  }
}
