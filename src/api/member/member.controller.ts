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

import { MEMBERS } from '../../statics';
import { Get as GetMember } from '../../domain/member/member.get';
import { Create as CreateMember } from '../../domain/member/member.create';
import { Update as UpdateMember } from '../../domain/member/member.update';
import { Delete as DeleteMember } from '../../domain/member/member.delete';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { Member } from 'src/domain/member/member';

@ApiTags('member')
@Controller('member')
export class MemberController {
  private logger = new Logger('Member Controller');

  constructor(
    private readonly getMember: GetMember,
    private readonly createMember: CreateMember,
    private readonly updateMember: UpdateMember,
    private readonly deleteMember: DeleteMember,
  ) {
    this.patchData();
  }

  async patchData() {
    const member = await this.getMember.GetAll();
    if (!member[0]) {
      this.logger.log('Start Create Many Member.');
      await this.createMember.CreateMany(MEMBERS);
    }
  }

  @Get('all')
  public async Get(): Promise<any> {
    return await this.getMember.GetAll();
  }

  @Get('by-code/:code')
  public async GetByCode(@Param('code') code: string): Promise<any> {
    return await this.getMember.GetByCode(code);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async Create(@Body() member: CreateDTO): Promise<HttpStatus> {
    return await this.createMember.Create(member);
  }

  @Put('by-code/:code')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async UpdateByCode(
    @Param('code') code: string,
    @Body() members: UpdateDTO,
  ): Promise<Member> {
    return await this.updateMember.UpdateByCode(code, members);
  }

  @Delete('by-code/:code')
  public async DeleteByCode(@Param('code') code: string): Promise<Member> {
    return await this.deleteMember.DeleteByCode(code);
  }
}
