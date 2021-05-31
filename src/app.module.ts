import { Global, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './config/env.module';
import { EnvService } from './config/env.service';
import { ApiModule } from './api/api.module';
import { DomainModule } from './domain/domain.module';
import { PersistenceModule } from './persistence/persistence.module';

import { HelpersModule } from './helpers/helpers.module';
import { InitModule } from './helpers/init.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      useFactory: (envService: EnvService) => {
        return <MongooseModuleOptions>{
          uri: envService.getDbConnectionString(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        };
      },
      inject: [EnvService],
    }),
    ApiModule,
    DomainModule,
    PersistenceModule,
    InitModule,
    HelpersModule,
  ],
})
export class AppModule {}
