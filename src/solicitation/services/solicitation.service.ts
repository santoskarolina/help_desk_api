import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitationEntity } from '../entities/solicitation.entity';
import { Repository } from 'typeorm';
import { StatusEnum } from '../../models/status.enum';
import { ErrosEnum } from '../../models/error.enum';
import { UserLogin } from '../../user/entities/dto/user.dto';
import { UserService } from '../../user/services/user.service';
import { UserTypeEnum } from '../../models/userType.enum';
import { UserEntity } from '../../user/entities/user.entity';
import { SolicitationBody } from '../entities/dto/solicitation.dto';
import {CustomHttpException} from 'src/@utils/customExeception';
import { generateCode } from 'src/@utils/gererateCode';
import { SolicitationDTO } from '../entities/dto/soliciation.dtoRespons';

@Injectable()
export class SolicitationService {
  constructor(
    @InjectRepository(SolicitationEntity)
    private readonly solicitationRepository: Repository<SolicitationEntity>,
    private readonly userService: UserService
  ) {}

  async create(body: SolicitationBody,  user: UserLogin): Promise<SolicitationDTO> {
    const userLog = await this.userService.findByEmail(user.email);
    body = {...body, code: generateCode(), was_solved: false, status: StatusEnum.OPEN, user_requested: userLog };
    const solicitation: SolicitationEntity = await this.solicitationRepository.save(body);
    return this.buildSolicitation(solicitation);
  }

  buildSolicitation(solicitation: SolicitationEntity): SolicitationDTO{
    const body = new SolicitationDTO(solicitation);
    return body;
  }

  private isAdmin(userLog: UserEntity){
    return userLog.user_type === UserTypeEnum.ADMIN;
  }

  async getAll(user: UserLogin, status: string) {
    const userLog: UserEntity = await this.userService.findByEmail(user.email);
    const solicitations = await this.solicitationRepository.find({
      where: { ...!this.isAdmin(userLog) && { user_requested: { id: userLog.id } }, status: this.getStatus(status) },
      relations: { sector: true, user_requested: true},
      select: { user_requested: { name: true, id: true }}
    });
    return { solicitations: solicitations, totalSize: solicitations.length };
  }

  getStatus(status: string) {
    return status.toUpperCase() as StatusEnum;
  }

  async findOne(id: string, user: UserLogin): Promise<SolicitationEntity> {
    const userLog: UserEntity = await this.userService.findByEmail(user.email);

    const solicitation = await this.solicitationRepository.findOne({
      where: { user_requested: { id: userLog.id }, id: id },
      relations: ["user_requested", "sector", "solutions", "solutions.user"],
      select: {
        user_requested: { name: true, id: true, email: true }, solutions: {
          user: { name: true, id: true, email: true },
          description: true, id: true
        }
      }
    });
    if (!solicitation) throw new CustomHttpException(HttpStatus.PRECONDITION_FAILED, 'Solicitation not found', ErrosEnum.ENTITY_NODE_FOUND)
    return solicitation;
  }

  async resolveSolicitation(id: string) {
    let solicitation = await this.solicitationRepository.findOne({ where: { id: id } });
    if (!solicitation) throw new CustomHttpException(HttpStatus.PRECONDITION_FAILED, 'Solicitation not found', ErrosEnum.ENTITY_NODE_FOUND);
    solicitation = {...solicitation, was_solved: true, status: StatusEnum.CLOSE, closed_at: new Date() };
    await this.solicitationRepository.update(id, solicitation);
    return solicitation;
  }
}
