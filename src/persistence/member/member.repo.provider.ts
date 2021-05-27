import { Provider } from '@nestjs/common';
import { MemberRepository } from './member.repository';

export const MemberRepoProvider: Provider = {
  provide: 'MemberRepo',
  useClass: MemberRepository,
};
