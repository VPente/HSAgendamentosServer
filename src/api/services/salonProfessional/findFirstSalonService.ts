import { IPrisma, prisma } from "../../../../prisma";

export function findFirstSalon(args:IPrisma.SalonFindFirstArgs){
    return prisma.salon.findFirst(args);
}