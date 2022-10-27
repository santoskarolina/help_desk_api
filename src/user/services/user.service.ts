import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { ErrosEnum } from '../../models/error.enum';
import { CreateUserDto } from '../entities/dto/user.dto';
import { SectorService } from 'src/sector/services/sector.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly sectorService: SectorService,
  ) {}

  async createuser(body: CreateUserDto): Promise<UserEntity> {
    const userFind = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (userFind) {
      throw new HttpException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'Email already registered',
          type: ErrosEnum.EMAIL_ALREADY_REGISTERED,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    body.password = crypto.createHmac('sha256', body.password).digest('hex');
    await this.sectorService.findById(body.sector.sector_id);
    const user = await this.userRepository.save(body);
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async returnUser(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: ['user_id', 'name', 'email', 'user_type'],
    });
  }

  async deleteUser(userId: number){
    const user = await this.userRepository.findOne({
      where: {
        user_id: userId,
      },
    })

    if(user){
      try{
        return await this.userRepository.delete(userId)
      }catch(err){
        throw new HttpException(
          {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'User can not be deleted',
            type: ErrosEnum.USER_CANNOT_BE_DELETED,
          },
          HttpStatus.PRECONDITION_FAILED,
        );
      }
    }else{
      throw new HttpException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'User not found',
          type: ErrosEnum.ENTITY_NODE_FOUND,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
