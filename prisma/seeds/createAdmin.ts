import { hashSync } from 'bcrypt';
import { prisma } from '../prismaConfig';

export async function createAdmin() {
 
  await prisma.user.upsert({
    where: {
      email: 'admin@gmail.com',
    },
    update: {},
    create: {
      name: 'AdminLuizote',
      email: 'admin@gmail.com',
      password: hashSync('123123123', 12),
    },
  });
}
