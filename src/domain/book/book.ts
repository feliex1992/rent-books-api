export type Book = {
  _id?: string;
  code: string;
  title: string;
  author: string;
  stock: number;
  borrowedStatus: boolean;
};
