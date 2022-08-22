import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { UserLogin } from '../../../user/entities/dto/user.dto';
import { LocalAuthGuard } from '../../guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() user: UserLogin) {
    return this.service.login(user);
  }
}
