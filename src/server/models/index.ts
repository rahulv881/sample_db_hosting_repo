import mongoose, { ConnectionOptions } from 'mongoose';
import _ from 'lodash';
import { CONSTANT_CONFIG } from '../../config/CONSTANT_CONFIG';
import { StringUtils } from '../utils/StringUtils';

/**
 * Set mongoose promise to use bluebird promise
 */
mongoose.Promise = global.Promise;

let isConnected = false;

const createConnectionString = () => {
  const { USER, HOST, NAME, PASSWORD, PORT } = CONSTANT_CONFIG.DATABASE.RMS;

  const connectionString = [`mongodb://`];

  if (!(StringUtils.isEmptyString(USER) || StringUtils.isEmptyString(PASSWORD))) {
    connectionString.push(`${encodeURIComponent(USER)}:${encodeURIComponent(PASSWORD)}@`);
  }
  connectionString.push(`${HOST}:${PORT}/${NAME}`);

  const mongoUri = _.join(connectionString, '');

  return mongoUri;
};

export class MongoConnector {
  /**
   * Establish connection to the mongo database
   */
  static connect = async () => {
    /**
     * Return if connection is already made
     */
    if (isConnected) {
      return;
    }
    isConnected = true;

    /**
     * Set debug mode in mongoose
     */
    mongoose.set('debug', CONSTANT_CONFIG.DATABASE.RMS.DEBUG);

    const mongoUri = createConnectionString();

    const timeout = 30 * 1000;

    // recommended options from https://gist.github.com/mongolab-org/9959376
    const connectOptions: ConnectionOptions = {
      // Maintain up to `poolSize` socket connections
      poolSize: 8,
      keepAlive: true,
      keepAliveInitialDelay: 40 * 1000,
      connectTimeoutMS: timeout,

      // to fix deprecation warnings
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };

    await mongoose.connect(mongoUri, connectOptions);
  };

  /**
   * Close existing mongoose connections.
   */
  static close = async () => {
    await mongoose.connection.close();
  };
}
