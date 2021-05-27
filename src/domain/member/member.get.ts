import { Injectable, Inject } from '@nestjs/common';

import { Member } from './member';
import { IMemberDomain } from './member-domain.interface';

const MemberRepo = () => Inject('MemberRepo');

@Injectable()
export class Get {
  constructor(@MemberRepo() private readonly memberRepository: IMemberDomain) {}

  public async GetAll(): Promise<Member> {
    return await this.memberRepository.GetAll();
  }

  public async GetByCode(code: string): Promise<Member> {
    return await this.memberRepository.GetByCode(code);
  }
}
