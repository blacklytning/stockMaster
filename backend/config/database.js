require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

// Prisma will automatically use DATABASE_URL from .env
const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ PostgreSQL connected successfully via Prisma");
  } catch (error) {
    console.error("❌ PostgreSQL connection error:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

module.exports = { connectDB, prisma };
