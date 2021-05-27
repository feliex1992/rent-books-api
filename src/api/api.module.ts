import { Module } from '@nestjs/common';

import { DomainModule } from '../domain/domain.module';
import { MemberController } from './member/member.controller';

@Module({
  controllers: [MemberController],
  imports: [DomainModule],
})
export class ApiModule {}
