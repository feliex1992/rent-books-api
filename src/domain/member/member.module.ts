import { Module } from '@nestjs/common';

import { MemberGet } from './member.get';
import { MemberCreate } from './member.create';
import { MemberUpdate } from './member.update';
import { MemberDelete } from './member.delete';
import { MemberRepoModule } from '../../persistence/member/member.repo.module';

@Module({
  imports: [MemberRepoModule],
  providers: [MemberGet, MemberCreate, MemberUpdate, MemberDelete],
  exports: [MemberGet, MemberCreate, MemberUpdate, MemberDelete],
})
export class MemberModule {}
