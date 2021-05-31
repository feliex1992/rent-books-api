import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
// import { JWT_SECRET_KEY } from 'src/statics';
import { EnvService } from 'src/config/env.service';
import { EnvModule } from 'src/config/env.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: (envService: EnvService) => {
        return {
          secret: envService.getJwtSecretKey(),
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [EnvService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
