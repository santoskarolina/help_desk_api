import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {UserEntity} from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDto} from "../entities/dto/user.dto";
import * as crypto from 'crypto';
import {ErrosEnum} from "../../models/error.enum";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createuser(body: UserDto): Promise<UserEntity> {
        const userFind = await this.userRepository.findOne({
            where: {
                email: body.email
            }
        })

        if(userFind){
            throw new HttpException({
                status: HttpStatus.PRECONDITION_FAILED,
                message: "Email already registered",
                type: ErrosEnum.EMAIL_ALREADY_REGISTERED
            },  HttpStatus.PRECONDITION_FAILED)
        }
        body.password =  crypto
            .createHmac('sha256', body.password)
            .digest('hex');
        const user = await this.userRepository.save(body)
        return user;
    }

    async findByEmail(email: string){
        return await this.userRepository.findOne({
            where: {
                email: email
            },
        })
    }

    async returnUser(email: string){
        return await this.userRepository.findOne({
            where: {
                email: email
            },
            select: ["user_id","name","email","user_type"]
        })
    }
}
