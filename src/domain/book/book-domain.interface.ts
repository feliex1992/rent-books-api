import { Book } from './book';

export interface IBookDomain {
  BookGetAll(): Promise<Book>;
  BookGetAvailable(): Promise<Book>;
  BookGetById(_id: string): Promise<Book>;
  BookGetByCode(code: string): Promise<Book>;
  BookCreate(book: Partial<Book>): Promise<Book>;
  BookCreateMany(books: Array<Book>);
  BookUpdateById(_id: string, updatedFields: Partial<Book>): Promise<Book>;
  BookDeleteById(_id: string): Promise<Book>;
}
