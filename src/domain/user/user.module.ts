import { Module } from '@nestjs/common';

import { UserSignUp } from './user.signup';
import { UserSignIn } from './user.signin';
import { UserRepoModule } from '../../persistence/user/user-repo.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserRepoModule, AuthModule],
  providers: [UserSignUp, UserSignIn],
  exports: [UserSignUp, UserSignIn],
})
export class UserModule {}
