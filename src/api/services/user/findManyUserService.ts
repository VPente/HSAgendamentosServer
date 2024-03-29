import { IPrisma, prisma } from '../../../../prisma';

interface IFindManyUserService {
  take: number;
  page: number;
  filter: string;
}

export async function findManyUserService({ page, take, filter }: IFindManyUserService) {
  const where: IPrisma.UserWhereInput = {
    name: {
      contains: filter,
      mode: 'insensitive',
    },
  };

  const [users, count] = await prisma.$transaction([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
      take,
      skip: (page - 1) * take,
      orderBy: {
        name: 'asc',
      },
      where,
    }),
    prisma.user.count({
      where,
    }),
  ]);

  

  return { users, count };
}
