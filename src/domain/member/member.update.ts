import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { Member } from './member';
import { IMemberDomain } from './member-domain.interface';

const MemberRepo = () => Inject('MemberRepo');

@Injectable()
export class MemberUpdate {
  constructor(@MemberRepo() private readonly memberRepository: IMemberDomain) {}

  public async UpdateById(
    _id: string,
    updatedFields: Partial<Member>,
  ): Promise<Member> {
    return await this.memberRepository.MemberUpdateById(_id, updatedFields);
  }
}
