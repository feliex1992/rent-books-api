import { ClientSession } from 'mongoose';
import { Book } from './book';

export interface IBookDomain {
  BookGetAll(): Promise<Book>;
  BookGetAvailable(): Promise<Book>;
  BookGetById(_id: string): Promise<Book>;
  BookGetByCode(code: string): Promise<Book>;
  BookCreate(book: Partial<Book>, session: ClientSession): Promise<Book>;
  BookCreateMany(books: Array<Book>);
  BookUpdateById(
    _id: string,
    updatedFields: Partial<Book>,
    session: ClientSession,
  ): Promise<Book>;
  BookDeleteById(_id: string): Promise<Book>;
}
