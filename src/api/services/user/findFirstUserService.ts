import { IPrisma, prisma } from "../../../../prisma";

export function findFirstUser(args:IPrisma.UserFindFirstArgs){
    return prisma.user.findFirst(args);
}