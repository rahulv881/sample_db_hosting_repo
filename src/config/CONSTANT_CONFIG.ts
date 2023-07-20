import { config } from './index';

const serverName: string = config.nConfig.get('server:name');
const serverHost: string = config.nConfig.get('server:host');
const serverBaseUrl: string = config.nConfig.get('server:url');
const serverPort: number = config.nConfig.get('server:port');
const defaultTimeZone: string = config.nConfig.get('server:defaultTimeZone');

const env: string = config.nConfig.get('env');

const rmsDbHost: string = config.nConfig.get('database:rms:host');
const rmsDbPort: number = config.nConfig.get('database:rms:port');
const rmsDbName: string = config.nConfig.get('database:rms:name');
const rmsDbUser: string = config.nConfig.get('database:rms:user');
const rmsDbPassword: string = config.nConfig.get('database:rms:password');
const rmsDbDebug: boolean = config.nConfig.get('database:rms:debug');

const devVeativeDbHost: string = config.nConfig.get('database:dev_veative:host');
const devVeativeDbPort: number = config.nConfig.get('database:dev_veative:port');
const devVeativeDbName: string = config.nConfig.get('database:dev_veative:name');
const devVeativeDbUser: string = config.nConfig.get('database:dev_veative:user');
const devVeativeDbPassword: string = config.nConfig.get('database:dev_veative:password');
const devVeativeDbDebug: boolean = config.nConfig.get('database:dev_veative:debug');
const rmsLogSqlQuery: boolean = config.nConfig.get('database:rms:log_sql_query');
const devVeativeLogSqlQuery: boolean = config.nConfig.get('database:rms:log_sql_query');
const elasticNodeUrl: string = config.nConfig.get('elastic:node');
const rabbitMQBaseUrl: string = config.nConfig.get('rabbit:url');
const accessKeyId: string = config.nConfig.get('dynamo_db:access_key_id');
const secretAccessKey: string = config.nConfig.get('dynamo_db:secret_access_key');
const region: string = config.nConfig.get('dynamo_db:region');

export const CONSTANT_CONFIG = {
  SERVER: {
    NAME: serverName,
    HOST: serverHost,
    URL: serverBaseUrl,
    PORT: serverPort,
    DEFAULT_TIME_ZONE: defaultTimeZone
  },

  USER_AGENT: `${serverName}`,

  ENV: env,
  DATABASE: {
    RMS: {
      HOST: rmsDbHost,
      PORT: rmsDbPort,
      NAME: rmsDbName,
      USER: rmsDbUser,
      PASSWORD: rmsDbPassword,
      DEBUG: rmsDbDebug,
      LOG: rmsLogSqlQuery
    },
    DEV_VEATIVE: {
      HOST: devVeativeDbHost,
      PORT: devVeativeDbPort,
      NAME: devVeativeDbName,
      USER: devVeativeDbUser,
      PASSWORD: devVeativeDbPassword,
      DEBUG: devVeativeDbDebug,
      LOG: devVeativeLogSqlQuery
    },
  },
  ELASTIC_SEARCH: {
    URL: elasticNodeUrl
  },
  RABBIT_MQ: {
    URL: rabbitMQBaseUrl
  },
  DYNAMO_DB: {
    ACCESS_KEY_ID: accessKeyId,
    SECRET_ACCESS_KEY: secretAccessKey,
    REGION: region
  }
};
