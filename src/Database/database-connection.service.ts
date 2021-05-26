import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConnectionService {
  private readonly connectionString: string;
  private logger = new Logger('Database Connection');

  constructor(private readonly configService: ConfigService) {
    this.logger.log(this.configService.get<string>('DB_CONNECTION_STRING'));
    this.connectionString = this.configService.get<string>(
      'DB_CONNECTION_STRING',
    );
  }

  public get = (): string => this.connectionString;
}
