import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignInDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Id', description: 'Id of user.' })
  public readonly userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password', description: 'Password of user.' })
  public readonly password: string;
}
