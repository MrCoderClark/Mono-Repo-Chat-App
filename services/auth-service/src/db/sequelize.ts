import { Sequelize } from 'sequelize';

import { env } from '@/config/env';
import { logger } from '@/utils/logger';

export const sequelize = new Sequelize(env.AUTH_DB_URL, {
    dialect: 'mssql',
    logging:
        env.NODE_ENV === 'development'
            ? (msg: unknown) => {
                  logger.debug({ sequelize, msg });
              }
            : false,
    define: {
        underscored: true,
        freezeTableName: true,
    },
});

export const connectToDatabase = async (): Promise<void> => {
    await sequelize.authenticate();
    logger.info('Authentication to the database has been successful!');
};

export const closeDatabase = async () => {
    await sequelize.close();
    logger.info('Connection to the database closed successfully');
};
