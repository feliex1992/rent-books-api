import {
  Controller,
  Logger,
  Get,
  HttpStatus,
  Param,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MEMBERS } from 'src/statics';
import { MemberGet } from 'src/domain/member/member.get';
import { MemberCreate } from 'src/domain/member/member.create';
import { MemberUpdate } from 'src/domain/member/member.update';
import { MemberDelete } from 'src/domain/member/member.delete';
import { MemberCreateDTO } from './dto/member-create.dto';
import { MemberUpdateDTO } from './dto/member-update.dto';
import { Member } from 'src/domain/member/member';

@ApiTags('member')
@Controller('member')
export class MemberController {
  private logger = new Logger('Member Controller');

  constructor(
    private readonly memberGet: MemberGet,
    private readonly memberCreate: MemberCreate,
    private readonly memberUpdate: MemberUpdate,
    private readonly memberDelete: MemberDelete,
  ) {
    // this.patchData();
  }

  async patchData() {
    const member = await this.memberGet.GetAll();
    if (!member[0]) {
      this.logger.log('Start Create Many Member.');
      await this.memberCreate.CreateMany(MEMBERS);
    }
  }

  @Get('all')
  public async Get(): Promise<any> {
    return await this.memberGet.GetAll();
  }

  @Get('by-id/:_id')
  public async GetById(@Param('_id') _id: string): Promise<any> {
    return await this.memberGet.GetById(_id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async Create(@Body() member: MemberCreateDTO): Promise<HttpStatus> {
    return await this.memberCreate.Create(member);
  }

  @Put('by-id/:_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async UpdateById(
    @Param('_id') _id: string,
    @Body() updatedFields: MemberUpdateDTO,
  ): Promise<Member> {
    return await this.memberUpdate.UpdateById(_id, updatedFields);
  }

  @Delete('by-id/:_id')
  public async DeleteById(@Param('_id') _id: string): Promise<Member> {
    return await this.memberDelete.DeleteById(_id);
  }
}
