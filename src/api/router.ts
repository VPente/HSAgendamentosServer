import { Router } from 'express';

// #region MIDDLEWARES
import { tokenMiddleware } from './utils/middlewares/token';
// #endregion

// #region ROUTERS
import { privateRouter } from './controllers/private/private.routes';
import { publicRouter } from './controllers/public/public.routes';
// #endregion

export const serverRouter = Router();

serverRouter.use('/publics', publicRouter);

serverRouter.use('/privates', tokenMiddleware, privateRouter);
