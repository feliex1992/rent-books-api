import { Module } from '@nestjs/common';

import { DomainModule } from '../domain/domain.module';
import { MemberController } from './member/member.controller';
import { BookController } from './book/book.controller';

@Module({
  controllers: [MemberController, BookController],
  imports: [DomainModule],
})
export class ApiModule {}
