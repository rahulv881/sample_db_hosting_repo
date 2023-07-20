import { Sequelize } from 'sequelize';
import { CONSTANT_CONFIG } from '../config/CONSTANT_CONFIG';

export const DB_CONN = {
  RMS: new Sequelize({
    dialect: 'mysql',
    host: CONSTANT_CONFIG.DATABASE.RMS.HOST,
    port: CONSTANT_CONFIG.DATABASE.RMS.PORT,
    database: CONSTANT_CONFIG.DATABASE.RMS.NAME,
    username: CONSTANT_CONFIG.DATABASE.RMS.USER,
    password: CONSTANT_CONFIG.DATABASE.RMS.PASSWORD,
    logging: true
  })
  // DEV_VEATIVE: new Sequelize({
  //   dialect: 'mysql',
  //   host: CONSTANT_CONFIG.DATABASE.DEV_VEATIVE.HOST,
  //   port: CONSTANT_CONFIG.DATABASE.DEV_VEATIVE.PORT,
  //   database: CONSTANT_CONFIG.DATABASE.DEV_VEATIVE.NAME,
  //   username: CONSTANT_CONFIG.DATABASE.DEV_VEATIVE.USER,
  //   password: CONSTANT_CONFIG.DATABASE.DEV_VEATIVE.PASSWORD,
  //   logging: true
  // }),
};
