/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Sequelize from './db';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  try {
    console.log(process.env.PORT);
    await Sequelize.authenticate();
    await Sequelize.sync();
    const PORT = process.env.PORT;
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
