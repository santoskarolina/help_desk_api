import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./strategy/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constanta";
import { AuthController } from './controller/auth/auth.controller';
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
      UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),

  ],
  controllers: [AuthController]
})
export class AuthModule {}
