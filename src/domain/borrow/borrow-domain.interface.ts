import { Member } from '../member/member';
import { Book } from '../book/book';

export interface IBorrowDomain {
  // Member
  MemberGetAll(): Promise<Member>;
  MemberGetById(_id: string): Promise<Member>;
  MemberGetByCode(code: string): Promise<Member>;
  MemberCreate(createdData: Partial<Member>): Promise<Member>;
  MemberCreateMany(createdData: Array<Member>);
  MemberUpdateById(
    _id: string,
    updatedFields: Partial<Member>,
  ): Promise<Member>;
  MemberDeleteById(_id: string): Promise<Member>;

  // Book
  BookGetAll(): Promise<Book>;
  BookGetAvailable(): Promise<Book>;
  BookGetById(_id: string): Promise<Book>;
  BookGetByCode(code: string): Promise<Book>;
  BookCreate(book: Partial<Book>): Promise<Book>;
  BookCreateMany(books: Array<Book>);
  BookUpdateById(_id: string, updatedFields: Partial<Book>): Promise<Book>;
  BookDeleteById(_id: string): Promise<Book>;
}
