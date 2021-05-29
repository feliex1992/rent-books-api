import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { User } from './user';
import { IUserDomain } from './user-domain.interface';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class UserSignIn {
  constructor(@UserRepo() private readonly userRepository: IUserDomain) {}

  public async SignIn(userData: Partial<User>): Promise<string> {
    const { userId, password } = userData;

    const user = await this.userRepository.UserGetById(userId);
    if (!user) {
      throw new HttpException(
        'Invalid user id or password!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return 'User have signin.';
    } else {
      return 'User signin faile!';
    }
  }
}
