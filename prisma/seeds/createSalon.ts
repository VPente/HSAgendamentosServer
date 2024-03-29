import { prisma } from "../prismaConfig";

export async function createSalon() {
    await prisma.salon.upsert({
        where: {
            name: 'Salão do Luizote',
        },
        update: {},
        create: {
            name: 'Salão do Luizote',
            address: 'Rua dos Bobos, 0',
            phoneNumber: '999999999',
            city:'Turvo',
            documentCode: '123456789',
        },
    });
}