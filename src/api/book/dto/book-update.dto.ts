import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BookUpdateDTO {
  @IsString()
  @IsNotEmpty()
  @Transform((data) => data.value.toUpperCase())
  @ApiProperty({ example: 'BK-01', description: 'Code of book.' })
  public readonly code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: `Book's Title`, description: 'Title of the book.' })
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'Name of the book author.' })
  public readonly author: string;
}
