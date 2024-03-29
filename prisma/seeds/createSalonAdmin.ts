import { prisma } from "../prismaConfig";

export async function createSalonAdmin() {

const admin = await prisma.user.findFirst({
    where: {
         email: 'admin@gmail.com'
    }
})
const salon = await prisma.salon.findFirst({
    where: {
        name: 'Salão do Luizote'
    }
})

if (!admin || !salon) {
  console.log('Admin or Salon not found') 
return
}
const salonAdmin = await prisma.salonProfessional.findFirst({
    where: {
        userId: admin.id,
        salonId: salon.id
    }
})

if(salonAdmin) {
    console.log('Salon Admin already exists')
    return;
}
await prisma.salonProfessional.create({
    data:{
        salon:{connect:{id:salon.id}},
        user:{connect:{id:admin.id}},
        salonUserPermissions:{
            createMany:{
                data:[
                    {
                        permission:'admin'
                    },
                    {
                        permission:'hairdresser'
                    },
                    {
                        permission:'manicure'
                    }
                ]
            }
        }
    }

})
}