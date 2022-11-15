import { PrismaClient } from '@prisma/client';

// Creating connection on Prisma
export const prisma = new PrismaClient({
    log: ['query'],
});
