import { Module } from '@nestjs/common';

import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { ReturnModule } from './return/return-book.module';

@Module({
  imports: [MemberModule, BookModule, BorrowModule, ReturnModule],
  exports: [MemberModule, BookModule, BorrowModule, ReturnModule],
})
export class DomainModule {}
