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

  public async GetById(_id: string): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.findById({ _id }, (err: any, result: IMemberEntity) => {
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

  public async UpdateById(_id: string, name: string): Promise<Member> {
    return new Promise<IMemberEntity>((resolve, reject) => {
      this.member.findByIdAndUpdate(
        { _id },
        { $set: { name } },
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

  public async DeleteById(_id: string): Promise<Member> {
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
