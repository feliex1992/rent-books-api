import { Schema, Document } from 'mongoose';

import { Book } from 'src/domain/book/book';

export const BookSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    stock: { type: Number, required: true },
    borrowedStatus: { type: Boolean, required: true },
    borrowedBy: { type: String, required: true },
    borrowedDate: { type: String, required: true },
  },
  { collection: 'book' },
);

export interface IBookEntity extends Omit<Book, '_id'>, Document {}
