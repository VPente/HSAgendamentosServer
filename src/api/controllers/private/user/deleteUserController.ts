import { Request, Response } from 'express';
import { deleteUser, findFirstUser } from '../../../services/user';
import { ErrorMessage } from '../../../utils/error';
import { checkValues } from '../../../utils/validator';

interface IQuery {
    userId:string,
  }

export async function deleteUserController(req: Request, res:Response) {
    const {userId} = req.query as any as IQuery;

    checkValues([
        {
            label:'O Id de usuario',
            type:'string',
            value: userId
        }
    ])
    const existingId = await findFirstUser({where:{id:userId}});

    if(!existingId){
        throw new ErrorMessage({
            message:'Usuario não encontrado na base de dados',
            statusCode:'404 NOT FOUND'
        })
    }
    await deleteUser({where:{id:userId}})

    return res.status(200).json({message:'Usuário deletado com sucesso'})
}