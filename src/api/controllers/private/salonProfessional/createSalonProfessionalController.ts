import { Request, Response } from 'express';
import {
  createSalonProfessional,
  findFirstSalon,
  findFirstSalonProfessional,
} from '../../../services/salonProfessional';
import { findFirstUser } from '../../../services/user';
import { ErrorMessage } from '../../../utils/error';
import { checkValues } from '../../../utils/validator';


interface IBody {
  salonId: string;
  userId: string;

}

export async function createSalonProfessionalController(req: Request, res: Response) {
  const { salonId, userId }: IBody = req.body;

  checkValues([
    {
      label: 'Id do Salão',
      type: 'string',
      value: salonId,
    },
    {
      label: 'Id do Usuário',
      type: 'string',
      value: userId,
    },
  ]);


  const user = await findFirstUser({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const salon = await findFirstSalon({
    where: {
      id: salonId,
    },
  });

  if (!salon) {
    return res.status(404).json({ error: 'Salão não encontrado' });
  }

  const existingSalonProfessional = await findFirstSalonProfessional({
    where: {
      salonId,
      userId,
    },
  });

  if (existingSalonProfessional) {
    throw new ErrorMessage({
      statusCode: '400 BAD REQUEST',
      message: 'Profissional já cadastrado.',
    });
  }
 
  await createSalonProfessional({
    data: {
      userId,
      salonId,
    },
  });

  return res.status(201).json({
    message: 'Profissional cadastrado com sucesso!',
  });
}
