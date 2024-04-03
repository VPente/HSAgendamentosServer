import { IPrisma, prisma } from '../../../../prisma';

export async function createSalonProfessional(args: IPrisma.SalonProfessionalCreateArgs) {
  return prisma.salonProfessional.create(args);
}
