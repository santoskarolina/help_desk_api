import { Body, Controller, Delete, Param, Post, UseGuards, Get } from '@nestjs/common';
import {RoleGuard} from 'src/auth/guards/role.guard';
import { CreateUserDto } from '../entities/dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createuser(user);
  }

  @UseGuards(RoleGuard)
  @Delete(':id')
  delteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(RoleGuard)
  @Get()
  listAll(){
    return this.userService.getUsers()
  }
}
