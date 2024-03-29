import { Router } from 'express';

// #region AUTH
import { loginController } from './auth';
import { createUserController } from './user';

// #endregion
// recoveryPasswordController,
  // sendEmailToRecoveryPasswordController,
export const publicRouter = Router();
// #region AUTH
publicRouter.post('/login', loginController);

publicRouter.post('/user/create', createUserController);


// publicRouter.post('/send-recovery-password-email', sendEmailToRecoveryPasswordController);
// publicRouter.post('/recovery-password', recoveryPasswordController);
// #endregion
