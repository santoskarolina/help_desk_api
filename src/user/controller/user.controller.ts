import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../entities/dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createuser(user);
  }

  @Delete(':id')
  delteUser(@Param('id') user_id: number) {
    return this.userService.deleteUser(user_id);
  }
}
