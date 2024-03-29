import { IPrisma, prisma } from '../../../../prisma';

export function createUserAccessService(args: IPrisma.UserAccessCreateArgs) {
  return prisma.userAccess.create(args);
}
