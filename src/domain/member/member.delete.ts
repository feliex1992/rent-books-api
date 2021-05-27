import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { Member } from './member';
import { IMemberDomain } from './member-domain.interface';

const MemberRepo = () => Inject('MemberRepo');

@Injectable()
export class Delete {
  constructor(@MemberRepo() private readonly memberRepository: IMemberDomain) {}

  public async DeleteByCode(code: string): Promise<Member> {
    return await this.memberRepository.DeleteByCode(code);
  }
}
