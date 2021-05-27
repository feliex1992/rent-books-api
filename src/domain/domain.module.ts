import { Module } from '@nestjs/common';

import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [MemberModule, BookModule, BorrowModule],
  exports: [MemberModule, BookModule, BorrowModule],
})
export class DomainModule {}
