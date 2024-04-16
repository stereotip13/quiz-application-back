import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  //payload = info from tonek in login method
  async validate(payload: any) {
    const user = await this.userService.findUserByName(payload.userName);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
