import { Member } from '../member/member';
import { Book } from '../book/book';

export interface IReturnBookDomain {
  // Member
  MemberGetById(_id: string): Promise<Member>;
  MemberUpdateById(
    _id: string,
    updatedFields: Partial<Member>,
  ): Promise<Member>;

  // Book
  BookGetById(_id: string): Promise<Book>;
  BookUpdateById(_id: string, updatedFields: Partial<Book>): Promise<Book>;
}
