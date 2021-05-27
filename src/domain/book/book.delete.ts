import { Injectable, Inject } from '@nestjs/common';

import { Book } from './book';
import { IBookDomain } from './book-domain.interface';

const BookRepo = () => Inject('BookRepo');

@Injectable()
export class BookDelete {
  constructor(@BookRepo() private readonly bookRepository: IBookDomain) {}

  public async DeleteById(_id: string): Promise<Book> {
    return await this.bookRepository.DeleteById(_id);
  }
}
