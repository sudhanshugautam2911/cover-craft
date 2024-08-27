import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

// Optional: Add error handling for better debugging
try {
  prisma.$connect();
} catch (error) {
  console.error('Failed to connect to the database:', error);
}

export const db = prisma;
