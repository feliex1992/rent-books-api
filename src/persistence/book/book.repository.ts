import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IBookDomain } from 'src/domain/book/book-domain.interface';
import { IBookEntity } from './book.entity';
import { Book } from 'src/domain/book/book';

@Injectable()
export class BookRepository implements IBookDomain {
  constructor(@InjectModel('Book') private readonly book: Model<IBookEntity>) {}

  public GetAll(): Promise<Book> {
    return new Promise<IBookEntity>((resolve, reject) => {
      this.book.find({}, (err: any, result: IBookEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public GetAvailable(): Promise<Book> {
    return new Promise<IBookEntity>((resolve, reject) => {
      this.book.find(
        { borrowedStatus: false },
        (err: any, result: IBookEntity) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        },
      );
    });
  }

  public GetById(_id: string): Promise<Book> {
    return new Promise<IBookEntity>((resolve, reject) => {
      this.book.findById({ _id }, (err: any, result: IBookEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public GetByCode(code: string): Promise<Book> {
    return new Promise<IBookEntity>((resolve, reject) => {
      this.book.findOne({ code }, (err: any, result: IBookEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public Create(book: Partial<Book>): Promise<Book> {
    return new Promise<IBookEntity>((resolve, reject) => {
      const newBook = new this.book(book);
      newBook.save({}, (err: any, result: IBookEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public async CreateMany(books: Array<Book>) {
    await this.book.insertMany(books);
  }

  public UpdateById(
    bookId: string,
    updatedFields: Partial<Book>,
  ): Promise<Book> {
    return new Promise<IBookEntity>((resolve, reject) => {
      this.book.findByIdAndUpdate(
        bookId,
        { $set: updatedFields },
        { new: true },
        (err: any, result: IBookEntity) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        },
      );
    });
  }

  public DeleteById(_id: string) {
    return new Promise<IBookEntity>((resolve, reject) => {
      this.book.findByIdAndDelete(
        { _id },
        {},
        (err: any, result: IBookEntity) => {
          if (err) {
            reject(err);
          }

          if (!result) {
            reject(
              new HttpException(
                `Book with id: ${_id} can't found!`,
                HttpStatus.NOT_FOUND,
              ),
            );
          }
          resolve(result);
        },
      );
    });
  }
}
