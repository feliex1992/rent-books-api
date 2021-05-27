import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IMemberDomain } from '../../domain/member/member-domain.interface';
import { IMemberEntity } from './member.entity';
import { Member } from '../../domain/member/member';

@Injectable()
export class MemberRepository implements IMemberDomain {
  constructor(
    @InjectModel('Member') private readonly member: Model<IMemberEntity>,
  ) {}

  public async GetAll(): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.find({}, (err: any, result: IMemberEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public async GetByCode(code: string): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.findOne({ code }, (err: any, result: IMemberEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public async Create(createdData: Partial<Member>): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      const newMember = new this.member(createdData);
      newMember.save({}, (err: any, result: IMemberEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public async CreateMany(createdData: Array<Member>) {
    await this.member.insertMany(createdData);
  }

  public async UpdateByCode(code: string, name: string): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.findOneAndUpdate(
        { code },
        { $set: { name } },
        { new: true },
        (err: any, result: IMemberEntity) => {
          if (err) {
            reject(err);
          }

          if (!result) {
            reject(
              new HttpException(
                `Code member: ${code} can't found!`,
                HttpStatus.NOT_FOUND,
              ),
            );
          }
          resolve(result);
        },
      );
    });
  }

  public async DeleteByCode(code: string): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.findOneAndDelete(
        { code },
        {},
        (err: any, result: IMemberEntity) => {
          if (err) {
            reject(err);
          }

          if (!result) {
            reject(
              new HttpException(
                `Code member: ${code} can't found!`,
                HttpStatus.NOT_FOUND,
              ),
            );
          }
          resolve(result);
        },
      );
    });
  }
}
