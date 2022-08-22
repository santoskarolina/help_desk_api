import {Body, Controller, Post} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {UserDto} from "../entities/dto/user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: UserDto){
    return this.userService.createuser(user)
  }
}
