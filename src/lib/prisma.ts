// lib/db.ts - 核心兼容文件
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// 1. 标准 Prisma 实例（兼容 NextAuth）
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 2. 创建实例时添加 Neon 优化
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        // 关键：添加连接池参数
        url:
          process.env.DATABASE_URL +
          (process.env.DATABASE_URL?.includes("?") ? "&" : "?") +
          "pgbouncer=true&connection_limit=10&pool_timeout=60",
      },
    },
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// 3. 可选：添加 Accelerate 扩展

export const acceleratedPrisma = prisma.$extends(withAccelerate());

// 4. 开发环境优化
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
