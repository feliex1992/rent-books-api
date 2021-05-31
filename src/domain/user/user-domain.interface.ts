import { User } from './user';

export interface IUserDomain {
  UserCreate(user: Partial<User>): Promise<User>;
  UserGetById(userId: string): Promise<User>;
}
