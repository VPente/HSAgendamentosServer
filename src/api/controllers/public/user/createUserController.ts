import { Request, Response } from 'express';

import { hashSync } from 'bcrypt';
import { createUserService, findFirstUser } from '../../../services/user';
import { createInitialsAvatar } from '../../../utils/api/createInitialsAvatar';
import { ErrorMessage } from '../../../utils/error';
import { checkValues } from '../../../utils/validator';

interface IBody {
  name: string;
  image?: string;
  email: string;
  password: string;
}

export async function createUserController(req: Request, res: Response) {
  const { name, image, email, password }: IBody = req.body;

// #region VALIDATIONS
    checkValues([
        {
            label:'nome',
            type:'string',
            value:name
        },
        {
            label:'email',
            type:'email',
            value:email
        },
        {
            label:'senha',
            type:'string',
            value:password
        },
        {
            label:'imagem',
            type:'string',
            value:image,
            required:false
        }
    ])

  const lowerCaseEmail = email.toLowerCase();
  
  const user = await findFirstUser({where:{email:lowerCaseEmail}});

  if (user) {
    throw new ErrorMessage({
      statusCode: '400 BAD REQUEST',
      message: 'Email já cadastrado.',
    });
  }

// #endregion
await createUserService({
    data:{
        email:lowerCaseEmail,
        name,
        password:hashSync(password, 12),
        image: image || createInitialsAvatar(name),
    }
});

  return res.status(201).json({
    message: 'Usuário cadastrado com sucesso!',
  });
}
