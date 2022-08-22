import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import * as crypto from 'crypto';
import { UserLogin } from '../../user/entities/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  user: any = {};

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    this.user = await this.userService.findByEmail(email);

    password = crypto.createHmac('sha256', password).digest('hex');

    if (this.user && this.user.password === password) {
      return this.user;
    }
    return null;
  }

  async login(user: UserLogin) {
    const payload = { email: user.email, sub: user.password };
    const userLog = await this.userService.returnUser(user.email);
    return {
      user: { ...userLog },
      access_token: this.jwtService.sign(payload),
    };
  }
}
