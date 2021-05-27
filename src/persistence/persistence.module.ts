import { Module } from '@nestjs/common';

import { MemberRepoModule } from './member/member.repo.module';

@Module({
  imports: [MemberRepoModule],
  exports: [MemberRepoModule],
})
export class PersistenceModule {}
