import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { Member } from './member';
import { IMemberDomain } from './member-domain.interface';

const MemberRepo = () => Inject('MemberRepo');

@Injectable()
export class Update {
  constructor(@MemberRepo() private readonly memberRepository: IMemberDomain) {}

  public async UpdateByCode(
    code: string,
    members: Partial<Member>,
  ): Promise<Member> {
    const { name } = members;

    return await this.memberRepository.UpdateByCode(code, name);
  }
}
