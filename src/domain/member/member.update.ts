import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { Member } from './member';
import { IMemberDomain } from './member-domain.interface';

const MemberRepo = () => Inject('MemberRepo');

@Injectable()
export class MemberUpdate {
  constructor(@MemberRepo() private readonly memberRepository: IMemberDomain) {}

  public async UpdateById(
    _id: string,
    members: Partial<Member>,
  ): Promise<Member> {
    const { name } = members;

    return await this.memberRepository.UpdateById(_id, name);
  }
}
