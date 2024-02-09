import { Sequelize } from 'sequelize-typescript';
const sequelize = new Sequelize(
  process.env.DB_NAME, //название ДБ
  process.env.DB_USER, //Пользак
  process.env.DB_PASSWORD, //пароль
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
  },
);
export default sequelize;
