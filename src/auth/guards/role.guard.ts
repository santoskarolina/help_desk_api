
import { CanActivate, ExecutionContext, Injectable, mixin, Type } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserTypeEnum } from 'src/models/userType.enum';
import { UserLogin } from 'src/user/entities/dto/user.dto';
import { UserService } from 'src/user/services/user.service';

export interface RequestWithUser extends Request {
  user: UserLogin| any;
}

@Injectable()
export class RoleGuard extends AuthGuard('jwt') implements CanActivate {

  constructor( private userService: UserService){
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)
  
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userRequest = request.user
    const user = await this.userService.findByEmail(userRequest.email)

    return user?.user_type === UserTypeEnum.ADMIN
  }
}