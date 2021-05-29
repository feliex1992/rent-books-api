import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserDomain } from '../../domain/user/user-domain.interface';
import { IUserEntity } from './user.entity';
import { User } from '../../domain/user/user';

@Injectable()
export class UserRepository implements IUserDomain {
  constructor(@InjectModel('User') private readonly user: Model<IUserEntity>) {}

  public async UserCreate(userData: Partial<User>): Promise<User> {
    return new Promise<IUserEntity>((resolve, reject) => {
      const newUser = new this.user(userData);
      newUser.save({}, (err: any, result: IUserEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public UserGetById(userId: string): Promise<User> {
    return new Promise<IUserEntity>((resolve, reject) => {
      try {
        this.user.findOne({ userId }, (err: any, result: IUserEntity) => {
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
}
