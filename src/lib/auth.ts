// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // 使用上面的实例
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma), // 直接传入 prisma 实例
  providers: [
    Credentials({
      async authorize(credentials) {
        // 使用 prisma 查询用户
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user || !user.password) {
          return null;
        }

        // 使用 bcryptjs 验证密码
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isValid) {
          return null;
        }

        return user;
      },
    }),
  ],
});
