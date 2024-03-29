import { IPrisma, prisma } from "../../../../prisma";

export function deleteUser(args:IPrisma.UserDeleteArgs){
    return prisma.user.delete(args)
}