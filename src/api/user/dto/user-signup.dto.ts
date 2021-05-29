import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Id', description: 'Id of user.' })
  public readonly userId: string;

  @IsString()
  @IsNotEmpty()
  @Transform((data) => data.value.toUpperCase())
  @ApiProperty({ example: 'name', description: 'Name of user.' })
  public readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password', description: 'Password of user.' })
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'retype-password',
    description: 'Retype-Password of user.',
  })
  public readonly retypePassword: string;
}
