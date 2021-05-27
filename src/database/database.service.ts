import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private readonly connectionString: string;

  constructor(private readonly configService: ConfigService) {
    this.connectionString = this.configService.get<string>(
      'DB_CONNECTION_STRING',
    );
  }

  public get = (): string => this.connectionString;
}
