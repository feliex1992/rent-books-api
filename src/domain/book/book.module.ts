import { Module } from '@nestjs/common';

import { BookGet } from './book.get';
import { BookCreate } from './book.create';
import { BookUpdate } from './book.update';
import { BookDelete } from './book.delete';
import { BookRepoModule } from 'src/persistence/book/book.repo.module';

@Module({
  imports: [BookRepoModule],
  providers: [BookGet, BookCreate, BookUpdate, BookDelete],
  exports: [BookGet, BookCreate, BookUpdate, BookDelete],
})
export class BookModule {}
