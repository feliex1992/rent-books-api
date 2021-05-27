import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import * as moment from 'moment';

import { Member } from './member';
import { IMemberDomain } from './member-domain.interface';

const MemberRepo = () => Inject('MemberRepo');

@Injectable()
export class MemberCreate {
  constructor(@MemberRepo() private readonly memberRepository: IMemberDomain) {}

  public async Create(createdData: Partial<Member>): Promise<HttpStatus> {
    const { code } = createdData;
    const member = await this.memberRepository.MemberGetByCode(code);
    if (member) {
      throw new HttpException('Code member already use.', HttpStatus.CONFLICT);
    }
    const dataMember = {
      ...createdData,
      suspendDate: moment(new Date()).format('YYYY-MM-DD').toString(),
      borrowedBook: 0,
    };
    await this.memberRepository.MemberCreate(dataMember);
    throw new HttpException(createdData, HttpStatus.CREATED);
  }

  public async CreateMany(createdData: Array<Member>) {
    await this.memberRepository.MemberCreateMany(createdData);
  }
}
