import { Member } from './member';

export interface IMemberDomain {
  GetAll(): Promise<Member>;
  GetById(_id: string): Promise<Member>;
  GetByCode(code: string): Promise<Member>;
  Create(createdData: Partial<Member>): Promise<Member>;
  CreateMany(createdData: Array<Member>);
  UpdateById(_id: string, name: string): Promise<Member>;
  DeleteById(_id: string): Promise<Member>;
}
