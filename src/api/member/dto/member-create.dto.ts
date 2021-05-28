import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MemberCreateDTO {
  @IsString()
  @IsNotEmpty()
  @Transform((data) => data.value.toUpperCase())
  @ApiProperty({ example: 'M00X', description: 'Code of member' })
  public readonly code: string;

  @IsString()
  @IsNotEmpty()
  @Transform((data) => data.value.toUpperCase())
  @ApiProperty({ example: 'John Doe', description: 'Name of member' })
  public readonly name: string;
}
