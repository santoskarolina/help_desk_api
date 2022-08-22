import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitationEntity } from '../entities/solicitation.entity';
import { Repository } from 'typeorm';
import { SolicitationCreate } from '../entities/dto/solicitation.dto';
import { StatusEnum } from '../../models/status.enum';
import { ErrosEnum } from '../../models/error.enum';
import { UserLogin } from '../../user/entities/dto/user.dto';
import { UserService } from '../../user/services/user.service';
import { UserTypeEnum } from '../../models/userType.enum';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class SolicitationService {
  constructor(
    @InjectRepository(SolicitationEntity)
    private readonly solicitationRepository: Repository<SolicitationEntity>,
    private readonly userService: UserService,
  ) {}

  private static generateCode(): string {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ';
    const codeLength = 6;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      code += chars.substring(randomNumber, randomNumber + 1);
    }

    return code;
  }

  async create(
    body: SolicitationCreate,
    user: UserLogin,
  ): Promise<SolicitationEntity> {
    const userLog = await this.userService.findByEmail(user.email);
    body.code = SolicitationService.generateCode();
    body.was_solved = false;
    body.status = StatusEnum.OPEN;
    body.user_requested = userLog;
    const solicitation = await this.solicitationRepository.save(body);
    return solicitation;
  }

  async findAllOpen(user: UserLogin) {
    let whereOptions = {};
    const userLog: UserEntity = await this.userService.findByEmail(user.email);

    if (userLog.user_type === UserTypeEnum.USER) {
      whereOptions = {
        user_requested: { user_id: userLog.user_id },
        status: StatusEnum.OPEN,
      };
    } else if (userLog.user_type === UserTypeEnum.ADMIN) {
      whereOptions = { status: StatusEnum.OPEN };
    }

    const solicitations = await this.solicitationRepository.find({
      where: whereOptions,
      relations: ['user_requested', 'sector'],
    });

    return {
      solicitations: solicitations,
      totalSize: solicitations.length,
    };
  }

  async findAllClose(user: UserLogin) {
    let whereOptions = {};
    const userLog: UserEntity = await this.userService.findByEmail(user.email);

    if (userLog.user_type === UserTypeEnum.USER) {
      whereOptions = {
        user_requested: { user_id: userLog.user_id },
        status: StatusEnum.CLOSE,
      };
    } else if (userLog.user_type === UserTypeEnum.ADMIN) {
      whereOptions = { status: StatusEnum.CLOSE };
    }

    const solicitations = await this.solicitationRepository.find({
      where: whereOptions,
      relations: ['user_requested', 'sector'],
    });

    return {
      solicitations: solicitations,
      totalSize: solicitations.length,
    };
  }

  async findOne(id: number, user: UserLogin): Promise<SolicitationEntity> {
    let whereOptions = {};
    const userLog: UserEntity = await this.userService.findByEmail(user.email);

    if (userLog.user_type === UserTypeEnum.USER) {
      whereOptions = {
        user_requested: { user_id: userLog.user_id },
        solicitation_id: id,
      };
    } else if (userLog.user_type === UserTypeEnum.ADMIN) {
      whereOptions = { solicitation_id: id };
    }

    const solicitation = await this.solicitationRepository.findOne({
      where: whereOptions,
      relations: {
        user_requested: true,
        solutions: {
          user: true,
        },
        sector: true,
      },
    });
    if (solicitation) {
      return solicitation;
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          message: 'Solicitation not found',
          type: ErrosEnum.ENTITY_NODE_FOUND,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  async resolveSolicitation(id: number) {
    const solicitation = await this.solicitationRepository.findOne({
      where: {
        solicitation_id: id,
      },
    });

    if (!solicitation) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          message: 'Solicitation not found',
          type: ErrosEnum.ENTITY_NODE_FOUND,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    solicitation.was_solved = true;
    solicitation.status = StatusEnum.CLOSE;
    solicitation.closed_at = new Date();
    await this.solicitationRepository.update(id, solicitation);
    return solicitation;
  }
}
