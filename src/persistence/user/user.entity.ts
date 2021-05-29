import { Schema, Document } from 'mongoose';

import { User } from '../../domain/user/user';

export const UserSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: 'user' },
);

export interface IUserEntity extends Omit<User, '_id'>, Document {}
