import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BorrowCreateDTO {
  @IsString()
  @IsNotEmpty()
  @Transform((data) => data.value.toUpperCase())
  @ApiProperty({ example: 'memberObjectId', description: 'Id of member' })
  public readonly idMember: string;

  @IsString()
  @IsNotEmpty()
  @Transform((data) => data.value.toUpperCase())
  @ApiProperty({ example: 'bookObjectId', description: 'Id of book' })
  public readonly idBook: string;
}
