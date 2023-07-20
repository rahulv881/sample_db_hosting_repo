import express from 'express';
import {
  getTasksByProjectIdController
} from './rds.controller';
import api from '..';

const rdsRouter = express.Router();

rdsRouter.get('/test', api.http(getTasksByProjectIdController));

export default rdsRouter;
