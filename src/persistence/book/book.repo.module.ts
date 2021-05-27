import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookSchema } from './book.entity';
import { BookRepoProvider } from './book.repo.provider';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  providers: [BookRepoProvider],
  exports: [BookRepoProvider],
})
export class BookRepoModule {}
