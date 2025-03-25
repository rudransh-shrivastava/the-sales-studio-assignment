import { PrismaClient } from "@prisma/client";

// Type declaration for global prisma client
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Singleton function
const prisma = globalThis.prisma || new PrismaClient();

// Attach to global in development to prevent hot-reload issues
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
