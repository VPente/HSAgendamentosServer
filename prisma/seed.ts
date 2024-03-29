import { prisma } from '.';
import { createAdmin, createSalon, createSalonAdmin } from './seeds';

const main = async () => {
  await createAdmin();
  await createSalon();
  await createSalonAdmin();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
