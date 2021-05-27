import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';

import { Member } from '../member/member';
import { Book } from '../book/book';
import { Borrow } from './borrow';
import { IBorrowDomain } from './borrow-domain.interface';

const MemberRepo = () => Inject('MemberRepo');
const BookRepo = () => Inject('BookRepo');

@Injectable()
export class BorrowCreate {
  constructor(
    @MemberRepo() private readonly memberRepository: IBorrowDomain,
    @BookRepo() private readonly bookRepository: IBorrowDomain,
  ) {}

  public async Create(borrow: Partial<Borrow>): Promise<any> {
    const { idMember, idBook } = borrow;

    const cekMember = await this.memberRepository.MemberGetById(idMember);
    if (!cekMember) {
      throw new HttpException(
        `Member with id: ${idMember} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (cekMember.borrowedBook >= 2) {
      throw new HttpException(
        `The number of books borrowed has reached the limit!`,
        HttpStatus.FORBIDDEN,
      );
    }
    if (
      cekMember.suspendDate > moment(new Date()).format('YYYY-MM-DD').toString()
    ) {
      throw new HttpException(
        `Member is currently being penalized!`,
        HttpStatus.FORBIDDEN,
      );
    }

    const cekBook = await this.bookRepository.BookGetById(idBook);
    if (!cekBook) {
      throw new HttpException(
        `Book with id: ${idBook} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (cekBook.borrowedStatus) {
      throw new HttpException(
        `The status of book is being borrowed!`,
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedBook = {
      borrowedStatus: true,
      borrowedBy: idMember,
      borrowedDate: moment(new Date()).format('YYYY-MM-DD').toString(),
    };
    await this.bookRepository.BookUpdateById(idBook, updatedBook);

    const updatedMember = {
      borrowedBook: Number(cekMember.borrowedBook) + 1,
    };
    await this.memberRepository.MemberUpdateById(idMember, updatedMember);

    return HttpStatus.CREATED;
  }
}
