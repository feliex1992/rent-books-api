import { Module } from '@nestjs/common';

import { Get } from './member.get';
import { Create } from './member.create';
import { Update } from './member.update';
import { Delete } from './member.delete';
import { MemberRepoModule } from '../../persistence/member/member.repo.module';

@Module({
  imports: [MemberRepoModule],
  providers: [Get, Create, Update, Delete],
  exports: [Get, Create, Update, Delete],
})
export class MemberModule {}
