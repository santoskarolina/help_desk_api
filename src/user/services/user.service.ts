import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { ErrosEnum } from '../../models/error.enum';
import { CreateUserDto } from '../entities/dto/user.dto';
import {CustomHttpException} from 'src/@utils/customExeception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createuser(body: CreateUserDto): Promise<Object> {
    const userFind = await this.userRepository.findOne({ where: { email: body.email } });

    if (!!userFind) throw new CustomHttpException(HttpStatus.PRECONDITION_FAILED,'Email already registered',ErrosEnum.EMAIL_ALREADY_REGISTERED);
    body.password = crypto.createHmac('sha256', body.password).digest('hex');
    const user = await this.userRepository.save(body);
    return this.buildUser(user, true);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({  where: { email: email } });
  }

  async returnUser(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      select: ['id', 'name', 'email', 'user_type'],
    });
  }

  async deleteUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new CustomHttpException(HttpStatus.PRECONDITION_FAILED, 'User not found', ErrosEnum.ENTITY_NODE_FOUND);

    try { return await this.userRepository.delete(userId) }
    catch (err) { throw new CustomHttpException(HttpStatus.PRECONDITION_FAILED, 'User can not be deleted', ErrosEnum.USER_CANNOT_BE_DELETED) }
  }

  async getUsers(){
    const users = await this.userRepository.find({
      select: ["id", "name", "email", "user_type", "created_at", "updated_at"]
    });
    return { users: users, totalSize: users.length }
  }

  buildUser(user_requested: UserEntity, hasDate: boolean = false){
      return {
        id: user_requested.id,
        email: user_requested.email,
        name: user_requested.name,
        ...hasDate && { createdAt: user_requested.created_at, updated_at: user_requested.updated_at }
      }
  }
}
