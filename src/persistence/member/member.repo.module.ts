import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberSchema } from './member.entity';
import { MemberRepoProvider } from './member.repo.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
  ],
  providers: [MemberRepoProvider],
  exports: [MemberRepoProvider],
})
export class MemberRepoModule {}
