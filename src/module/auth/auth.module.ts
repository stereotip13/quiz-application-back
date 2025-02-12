import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from 'src/strategy';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/guards/roles.guard';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [UserModule, TokenModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService, RolesGuard],
})
export class AuthModule {}
