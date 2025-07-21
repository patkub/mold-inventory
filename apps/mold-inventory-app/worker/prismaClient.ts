import { PrismaClient } from '../.generated/prisma';
import { PrismaD1 } from '@prisma/adapter-d1';

function createPrismaClient(MOLD_DB: any) {
  const adapter = new PrismaD1(MOLD_DB);
  const prisma = new PrismaClient({ adapter });
  return prisma;
}

export {
  createPrismaClient
}
