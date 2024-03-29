import { NextFunction, Request, Response } from 'express';

import { IToken } from '../../../../types/token';
import { findUserByIdService } from '../../../services/user';
import { ErrorMessage } from '../../error';
import { decodeTokenService } from '../../token';

export async function tokenMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ErrorMessage({
      statusCode: '401 UNAUTHORIZED',
      message: 'Token inválido.',
    });
  }

  try {
    const [, token] = authorization.split(' ');

    const { user } = decodeTokenService({ token }) as IToken;

   await findUserByIdService({ userId: user.id });

    req.user = user;

    next();
  } catch (error) {
    throw new ErrorMessage({
      statusCode: '401 UNAUTHORIZED',
      message: 'Token inválido.',
    });
  }
}
