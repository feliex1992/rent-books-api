import { Global, Module } from '@nestjs/common';
import { Helpers } from './helpers';
import { InitModule } from './modules/init.module';

@Global()
@Module({
  imports: [InitModule],
  providers: [Helpers],
  exports: [Helpers],
})
export class HelpersModule {}
