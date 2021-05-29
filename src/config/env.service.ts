import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  private readonly connectionString: string;
  private readonly jwtSecretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.jwtSecretKey = this.configService.get<string>('JWT_SECRET_KEY');
    this.connectionString = this.configService.get<string>(
      'DB_CONNECTION_STRING',
    );
  }

  public getDbConnectionString = (): string => this.connectionString;

  public getJwtSecretKey = (): string => this.jwtSecretKey;
}
