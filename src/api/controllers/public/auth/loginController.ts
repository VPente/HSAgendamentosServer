import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { createUserAccessService, findFirstUser } from '../../../services/user';
import { ErrorMessage } from '../../../utils/error';
import { generateToken } from '../../../utils/token';
import { checkValues } from '../../../utils/validator';

interface IBody {
  email: string;
  password: string;
}

export async function loginController(req: Request, res: Response) {
  const { email, password }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    { label: 'E-mail', type: 'string', value: email },
    { label: 'Senha', type: 'string', value: password },
  ]);

  const lowerCaseCredential = email.toLowerCase();

  // const user = await findUserByCredentialService({ credential: lowerCaseCredential });

  const user = await findFirstUser({where:{email:lowerCaseCredential}});

  if (!user) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Credenciais inválidas.',
    });
  }

  const validPassword = await compare(password, user.password || '');

  if (!validPassword) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Credenciais inválidas.',
    });
  }

  // #endregion

  await createUserAccessService({
    data: {
      userId: user.id,
    },
  });

  const token = await generateToken({
    user: {
      id: user.id,
    },
  });
  
  return res.status(200).json({
    token,
  });
}
