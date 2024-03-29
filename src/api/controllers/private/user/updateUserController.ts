import { Request, Response } from 'express';
import { findFirstUser, updateUserService } from '../../../services/user';
import { createInitialsAvatar } from '../../../utils/api/createInitialsAvatar';
import { ErrorMessage } from '../../../utils/error';
import { checkValues } from '../../../utils/validator';

export async function updateUserController(req: Request, res:Response) {
   const {userId, name, email, image} = req.body
    
   checkValues([
    {
        label:'Id de Usúario',
        type:'string',
        value:userId,
    },
    {
        label:'Nome',
        type:'string',
        value:name
    },
    {
        label:'email',
        type:'email',
        value:email
    },
    {
        label:"Imagem",
        type:'string',
        value:image,
        required:false 
    }
   ])

   const user = await findFirstUser({
    where:{
        id:userId
        }   
    })

    if(!user){
        throw new ErrorMessage({
            message:'Usuario não cadastrado',
            statusCode:'404 NOT FOUND'
        })
    }

    const lowerCaseEmail = email.toLowerCase();
    const existingEmail = await findFirstUser(
        {
            where:{
                email:lowerCaseEmail,
                id:{
                    not:userId
                }
            }
        })
    if(existingEmail){
        throw new ErrorMessage({
            message:'Email já cadastrado',
            statusCode:'400 BAD REQUEST'
        })
        }
    await updateUserService({
        data:{
        name, 
        email:lowerCaseEmail , 
        image: image || createInitialsAvatar(name),
    },
        userId
    })
    return res.status(200).json({message:'Usuário atualizado com sucesso'})
}