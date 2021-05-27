import { Module } from '@nestjs/common';

import { BookRepoModule } from 'src/persistence/book/book.repo.module';
import { MemberRepoModule } from 'src/persistence/member/member.repo.module';
import { BorrowCreate } from './borrow.create';

@Module({
  imports: [BookRepoModule, MemberRepoModule],
  providers: [BorrowCreate],
  exports: [BorrowCreate],
})
export class BorrowModule {}
