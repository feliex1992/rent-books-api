import { Injectable, Inject } from '@nestjs/common';

import { Member } from './member';
import { IMemberDomain } from './member-domain.interface';

const MemberRepo = () => Inject('MemberRepo');

@Injectable()
export class MemberGet {
  constructor(@MemberRepo() private readonly memberRepository: IMemberDomain) {}

  public async GetAll(): Promise<Member> {
    return await this.memberRepository.MemberGetAll();
  }

  public async GetById(_id: string): Promise<Member> {
    return await this.memberRepository.MemberGetById(_id);
  }
}
