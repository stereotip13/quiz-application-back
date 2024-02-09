import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
