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

  public async MemberGetAll(): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.find({}, (err: any, result: IMemberEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public async MemberGetById(_id: string): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      try {
        this.member.findById({ _id }, (err: any, result: IMemberEntity) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  public async MemberGetByCode(code: string): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.findOne({ code }, (err: any, result: IMemberEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public async MemberCreate(createdData: Partial<Member>): Promise<Member> {
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

  public async MemberCreateMany(createdData: Array<Member>) {
    await this.member.insertMany(createdData);
  }

  public async MemberUpdateById(
    _id: string,
    updatedFields: Partial<Member>,
  ): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.findByIdAndUpdate(
        { _id },
        { $set: updatedFields },
        { new: true },
        (err: any, result: IMemberEntity) => {
          if (err) {
            reject(err);
          }

          if (!result) {
            reject(
              new HttpException(
                `Member with id: ${_id} can't found!`,
                HttpStatus.NOT_FOUND,
              ),
            );
          }
          resolve(result);
        },
      );
    });
  }

  public async MemberDeleteById(_id: string): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.findByIdAndDelete(
        { _id },
        {},
        (err: any, result: IMemberEntity) => {
          if (err) {
            reject(err);
          }

          if (!result) {
            reject(
              new HttpException(
                `Member with id: ${_id} can't found!`,
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
