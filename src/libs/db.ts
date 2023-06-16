import "server-only"

import { PrismaClient } from '@prisma/client'

declare global {
    // eslint-disable-next-line no-var, no-unused-vars
    var cachedPrisma: PrismaClient
}

const getPrismaClient = () => {
    if (process.env.NODE_ENV === 'production') return new PrismaClient();
    if (!global.cachedPrisma) global.cachedPrisma = new PrismaClient();
    return global.cachedPrisma;
}

export const db = getPrismaClient();

