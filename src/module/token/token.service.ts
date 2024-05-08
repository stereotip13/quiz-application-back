import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async genereteJwtToken(user) {
    const payload = { user };//данные, которые помещаются в токен
    return this.jwtService.sign(payload, {
      secret: this.configService.get('secret_jwt'),//параметр секретный ключ для токена
      expiresIn: this.configService.get('expire_jwt'),//параметр когда истечет токен
    });
  }
}
