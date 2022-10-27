import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { UserLogin } from '../../../user/entities/dto/user.dto';
import { LocalAuthGuard } from '../../guards/local.guard';
import { RequestWithUser } from 'src/auth/guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Req() request: RequestWithUser) {
    const user = {
      email: request.user.email,
      password :request.user.password
    }
    return this.service.login(user);
  }
}
