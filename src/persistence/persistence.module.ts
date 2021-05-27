import { Module } from '@nestjs/common';

import { MemberRepoModule } from './member/member.repo.module';
import { BookRepoModule } from './book/book.repo.module';

@Module({
  imports: [MemberRepoModule, BookRepoModule],
  exports: [MemberRepoModule, BookRepoModule],
})
export class PersistenceModule {}
