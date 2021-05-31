import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserSignUpDTO } from 'src/api/user/dto/user-signup.dto';
import { User } from './user';
import { IUserDomain } from './user-domain.interface';

const UserRepo = () => Inject('UserRepo');
const salt = 10;

@Injectable()
export class UserSignUp {
  constructor(@UserRepo() private readonly userRepository: IUserDomain) {}

  public async SignUp(userData: Partial<UserSignUpDTO>): Promise<User> {
    const { userId, userName, password, retypePassword } = userData;

    if (password !== retypePassword) {
      throw new HttpException(
        'Password and retype-password not match!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = {
      userId,
      userName,
      password: await bcrypt.hash(password, salt),
    };
    return await this.userRepository.UserCreate(newUser);
  }
}
