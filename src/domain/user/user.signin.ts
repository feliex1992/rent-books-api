import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { User } from './user';
import { IUserDomain } from './user-domain.interface';
import { AuthService } from 'src/auth/auth.service';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class UserSignIn {
  constructor(
    @UserRepo() private readonly userRepository: IUserDomain,
    private authService: AuthService,
  ) {}

  public async SignIn(userData: Partial<User>): Promise<any> {
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
      const payload = { userId, userName: user.userName };
      const token = await this.authService.genToken(payload);
      console.log(payload);
      console.log(token);
      return {
        userId,
        userName: user.userName,
        token,
      };
    } else {
      throw new HttpException(
        'Invalid user id or password!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
