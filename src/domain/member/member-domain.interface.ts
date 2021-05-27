import { Member } from './member';

export interface IMemberDomain {
  GetAll(): Promise<Member>;
  GetByCode(code: string): Promise<Member>;
  Create(createdData: Partial<Member>): Promise<Member>;
  CreateMany(createdData: Array<Member>);
  UpdateByCode(code: string, name: string): Promise<Member>;
  DeleteByCode(code: string): Promise<Member>;
}
