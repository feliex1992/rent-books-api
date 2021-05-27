import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';

import { ReturnBook } from './return-book';
import { IReturnBookDomain } from './return-book-domain.interface';

const MemberRepo = () => Inject('MemberRepo');
const BookRepo = () => Inject('BookRepo');

@Injectable()
export class ReturnCreate {
  constructor(
    @MemberRepo() private readonly memberRepository: IReturnBookDomain,
    @BookRepo() private readonly bookRepository: IReturnBookDomain,
  ) {}

  public async Create(returnBook: Partial<ReturnBook>): Promise<HttpStatus> {
    const { idMember, idBook } = returnBook;

    const cekMember = await this.memberRepository.MemberGetById(idMember);
    if (!cekMember) {
      throw new HttpException(
        `Member with id: ${idMember} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const cekBook = await this.bookRepository.BookGetById(idBook);
    if (!cekBook) {
      throw new HttpException(
        `Book with id: ${idBook} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (!cekBook.borrowedStatus) {
      throw new HttpException(
        `The status of book is not being borrowed!`,
        HttpStatus.FORBIDDEN,
      );
    }
    if (
      String(cekMember._id).toUpperCase() !==
      String(cekBook.borrowedBy).toUpperCase()
    ) {
      throw new HttpException(
        `This book is not borrowed by this member!`,
        HttpStatus.FORBIDDEN,
      );
    }

    const dateBorrow = moment(cekBook.borrowedDate, 'YYYY-MM-DD');
    const dateNow = moment(new Date());
    const dateDiff = dateNow.diff(dateBorrow, 'days');

    const updatedBook = {
      borrowedStatus: false,
    };
    await this.bookRepository.BookUpdateById(idBook, updatedBook);

    const updatedMember = {
      borrowedBook: Number(cekMember.borrowedBook) - 1,
      suspendDate:
        dateDiff > 7
          ? moment(new Date()).add(4, 'days').format('YYYY-MM-DD')
          : moment(new Date()).format('YYYY-MM-DD'),
    };
    await this.memberRepository.MemberUpdateById(idMember, updatedMember);

    return HttpStatus.CREATED;
  }
}
