import { Schema, Document } from 'mongoose';

import { Member } from '../../domain/member/member';

export const MemberSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    suspendDate: { type: String, required: true },
  },
  { collection: 'member' },
);

export interface IMemberEntity extends Omit<Member, '_id'>, Document {}
