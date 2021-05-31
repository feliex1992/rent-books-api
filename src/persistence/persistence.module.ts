import { Module } from '@nestjs/common';

import { MemberRepoModule } from './member/member.repo.module';
import { BookRepoModule } from './book/book.repo.module';
import { UserRepoModule } from './user/user-repo.module';

@Module({
  imports: [MemberRepoModule, BookRepoModule, UserRepoModule],
  exports: [MemberRepoModule, BookRepoModule, UserRepoModule],
})
export class PersistenceModule {}
