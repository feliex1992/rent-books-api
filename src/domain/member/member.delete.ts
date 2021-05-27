import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { Member } from './member';
import { IMemberDomain } from './member-domain.interface';

const MemberRepo = () => Inject('MemberRepo');

@Injectable()
export class MemberDelete {
  constructor(@MemberRepo() private readonly memberRepository: IMemberDomain) {}

  public async DeleteById(_id: string): Promise<Member> {
    return await this.memberRepository.MemberDeleteById(_id);
  }
}
