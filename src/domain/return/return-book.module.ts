import { Module } from '@nestjs/common';

import { BookRepoModule } from 'src/persistence/book/book.repo.module';
import { MemberRepoModule } from 'src/persistence/member/member.repo.module';
import { ReturnCreate } from './return-book.create';

@Module({
  imports: [BookRepoModule, MemberRepoModule],
  providers: [ReturnCreate],
  exports: [ReturnCreate],
})
export class ReturnModule {}
