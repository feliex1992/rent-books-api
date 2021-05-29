import { Module } from '@nestjs/common';

import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { ReturnModule } from './return/return-book.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [MemberModule, BookModule, BorrowModule, ReturnModule, UserModule],
  exports: [MemberModule, BookModule, BorrowModule, ReturnModule, UserModule],
})
export class DomainModule {}
