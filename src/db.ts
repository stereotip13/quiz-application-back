//import { ConfigService } from '@nestjs/config';
import configurations from './configurations';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize(
  'quiz-db', //название ДБ
  'postgres', //Пользак
  '1234qwer',

  //String(process.env.DB_PASSWORD), //пароль
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
  },
);
//const configService = sequelize.get(ConfigService);
export default sequelize;
