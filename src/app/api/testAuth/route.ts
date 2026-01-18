// app/api/test-auth/route.ts
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. 测试 adapter 是否工作
    const adapter = PrismaAdapter(prisma);

    // 2. 测试是否能创建用户（模拟）
    const testEmail = `test-${Date.now()}@test.com`;

    return NextResponse.json({
      success: true,
      message: "NextAuth 适配器初始化成功",
      adapterType: typeof adapter,
      prismaConnected: !!prisma,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
