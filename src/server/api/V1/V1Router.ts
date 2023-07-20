import express from 'express';
import rdsRouter from './rds.router';

const router: express.Router = express.Router({ mergeParams: true });

router.use('/rds', rdsRouter);

export const V1Router = router;
