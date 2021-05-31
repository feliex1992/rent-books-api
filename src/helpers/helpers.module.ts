import { Global, Module } from '@nestjs/common';
import { Helpers } from './helpers';
import { InitModule } from './init.module';

@Global()
@Module({
  providers: [Helpers],
  exports: [Helpers],
})
export class HelpersModule {}
