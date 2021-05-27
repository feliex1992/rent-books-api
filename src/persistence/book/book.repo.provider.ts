import { Provider } from '@nestjs/common';
import { BookRepository } from './book.repository';

export const BookRepoProvider: Provider = {
  provide: 'BookRepo',
  useClass: BookRepository,
};
