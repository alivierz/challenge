import { Sequelize } from 'sequelize-typescript';
import { courses, user_courses, users } from 'src/utils/entity/db.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 3306,
        username: process.env.POSTGRES_USER || 'root',
        password: process.env.POSTGRES_PASSWORD || 'password',
        database: process.env.DPOSTGRES_DB || 'nest',
      });
      sequelize.addModels([users, courses, user_courses]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
