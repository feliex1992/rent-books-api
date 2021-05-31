import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './user.entity';
import { UserRepoProvider } from './user-repo.provider';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserRepoProvider],
  exports: [UserRepoProvider],
})
export class UserRepoModule {}
