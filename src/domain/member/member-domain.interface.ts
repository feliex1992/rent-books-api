import { Member } from './member';

export interface IMemberDomain {
  MemberGetAll(): Promise<Member>;
  MemberGetById(_id: string): Promise<Member>;
  MemberGetByCode(code: string): Promise<Member>;
  MemberCreate(createdData: Partial<Member>): Promise<Member>;
  MemberCreateMany(createdData: Array<Member>);
  MemberUpdateById(
    _id: string,
    updatedFields: Partial<Member>,
  ): Promise<Member>;
  MemberDeleteById(_id: string): Promise<Member>;
}
