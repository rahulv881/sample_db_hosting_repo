// # API routes
import express from 'express';
import bodyParser from 'body-parser';
import { middlewares } from '../lib/middleware';
import { RateLimiter } from '../utils/RateLimit';
import { EventLogger } from '../utils/logger/EventLogger';
import { ITransactionId } from '../lib/eventLogger/interfaces/ILogDocument';
import { V1Router } from './V1/V1Router';
import { CONSTANT_CONFIG } from '../../config/CONSTANT_CONFIG';
import { IDebugArg } from '../lib/eventLogger/EventLoggerRegistry';

const { cors, cacheControl } = middlewares;

const debug = EventLogger.logger('APIRoutes');

// @TODO refactor/clean this up - how do we want the routing to work long term?
const apiRoutes = async () => {
  const apiRouter: express.Router = express.Router();

  // ## CORS pre-flight check
  apiRouter.options(
    `*`,
    cors({ serverUrl: CONSTANT_CONFIG.SERVER.URL, whitelist: [], publicRoutes: [] })
  );

  // enable cors
  apiRouter.use(cors({ serverUrl: CONSTANT_CONFIG.SERVER.URL, whitelist: [], publicRoutes: [] }));

  apiRouter.use('/V1', V1Router);

  return apiRouter;
};

export const setupAPIRouter = async ({ transactionId }: { transactionId: ITransactionId }) => {
  const debugArg: IDebugArg = {
    methodName: 'setupAPIRouter'
  };
  debug.info(transactionId, debugArg, `API setup start`);
  const apiApp = express.Router();

  // API middleware
  // parse application/json
  apiApp.use(bodyParser.json({ limit: `10mb` }));

  // parse application/x-www-form-urlencoded
  apiApp.use(bodyParser.urlencoded({ extended: true, limit: `5mb` }));
  // API shouldn't be cached
  apiApp.use(cacheControl({ type: `private` }));

  // Routing
  apiApp.use(await apiRoutes());

  // API error handling
  apiApp.use(middlewares.errorHandler.resourceNotFound);
  apiApp.use(middlewares.errorHandler.handleJSONResponse);

  debug.info(transactionId, debugArg, `API setup end`);

  return apiApp;
};
