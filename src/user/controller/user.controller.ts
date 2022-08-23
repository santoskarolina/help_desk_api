import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../entities/dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createuser(user);
  }
}
