import { IPrisma, prisma } from "../../../../prisma";

export function findFirstSalonProfessional(args:IPrisma.SalonProfessionalFindFirstArgs){
    return prisma.salonProfessional.findFirst(args);
}