import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtServise: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async genereteJwtToken(user) {
    const payload = { user };
    return this.jwtServise.sign(payload, {
      secret: this.configService.get('secret_jwt'),
      expiresIn: this.configService.get('expire_jwt'),
    });
  }
}
