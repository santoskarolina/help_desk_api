import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {ErrosEnum} from "../../models/error.enum";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                message: "Email or password incorrect",
                type: ErrosEnum.EMAIL_OR_PASSWORD_INCORRECT
            },HttpStatus.FORBIDDEN);
        }
        return user;
    }
}
