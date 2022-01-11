import path from 'path';
import { createConnection } from 'typeorm';

export const connectToDB = () =>
  createConnection({
    type: 'mysql',
    host: 'mysql8',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
      path.join(
        __dirname,
        process.env.NODE_ENV === 'production' ? 'entity/*.js' : 'entity/*.ts'
      ),
    ],
    synchronize: true,
  });

export { UserORMEntity } from './entity/UserORMEntity';
