import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { DatabaseModuel } from './Database/database.module';
import { DatabaseConnectionService } from './Database/database-connection.service';

console.log(`${process.env.NODE_ENV}.env`);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [DatabaseModuel],
      useFactory: (database: DatabaseConnectionService) => {
        return <MongooseModuleOptions>{
          uri: database.get(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        };
      },
      inject: [DatabaseConnectionService],
    }),
  ],
})
export class AppModule {}
