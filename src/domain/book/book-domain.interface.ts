import { Book } from './book';

export interface IBookDomain {
  GetAll(): Promise<Book>;
  GetAvailable(): Promise<Book>;
  GetById(_id: string): Promise<Book>;
  GetByCode(code: string): Promise<Book>;
  Create(book: Partial<Book>): Promise<Book>;
  CreateMany(books: Array<Book>);
  UpdateById(_id: string, updatedFields: Partial<Book>): Promise<Book>;
  DeleteById(_id: string): Promise<Book>;
}
