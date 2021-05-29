import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserSignUpDTO } from './dto/user-signup.dto';
import { UserSignInDTO } from './dto/user-signin.dto';
import { User } from 'src/domain/user/user';
import { UserSignUp } from 'src/domain/user/user.signup';
import { UserSignIn } from 'src/domain/user/user.signin';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userSignUp: UserSignUp,
    private readonly userSignIn: UserSignIn,
  ) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async SignUp(@Body() user: UserSignUpDTO): Promise<User> {
    return await this.userSignUp.SignUp(user);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  public async SignIn(@Body() user: UserSignInDTO): Promise<string> {
    return await this.userSignIn.SignIn(user);
  }
}
