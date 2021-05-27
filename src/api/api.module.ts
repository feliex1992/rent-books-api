import { Module } from '@nestjs/common';

import { DomainModule } from '../domain/domain.module';
import { MemberController } from './member/member.controller';
import { BookController } from './book/book.controller';
import { BorrowController } from './borrow/borrow.controller';
import { ReturnController } from './return/return.controller';

@Module({
  controllers: [
    MemberController,
    BookController,
    BorrowController,
    ReturnController,
  ],
  imports: [DomainModule],
})
export class ApiModule {}
