import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';

import { IBookDomain } from 'src/domain/book/book-domain.interface';
import { IBookEntity } from './book.entity';
import { Book } from 'src/domain/book/book';

@Injectable()
export class BookRepository implements IBookDomain {
  constructor(@InjectModel('Book') private readonly book: Model<IBookEntity>) {}

  public BookGetAll(): Promise<Book> {
    return new Promise<IBookEntity>((resolve, reject) => {
      this.book.find({}, (err: any, result: IBookEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public BookGetAvailable(): Promise<Book> {
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

  public BookGetById(_id: string): Promise<Book> {
    return new Promise<IBookEntity>((resolve, reject) => {
      try {
        this.book.findById({ _id }, (err: any, result: IBookEntity) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  public BookGetByCode(code: string): Promise<Book> {
    return new Promise<IBookEntity>((resolve, reject) => {
      this.book.findOne({ code }, (err: any, result: IBookEntity) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  public BookCreate(book: Partial<Book>): Promise<Book> {
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

  public async BookCreateMany(books: Array<Book>) {
    await this.book.insertMany(books);
  }

  public BookUpdateById(
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

  public BookDeleteById(_id: string) {
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
