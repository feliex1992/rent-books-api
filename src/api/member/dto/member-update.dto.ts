import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MemberUpdateDTO {
  @IsString()
  @IsNotEmpty()
  @Transform((data) => data.value.toUpperCase())
  @ApiProperty({ example: 'John Doe', description: 'Name of member' })
  public readonly name: string;
}
