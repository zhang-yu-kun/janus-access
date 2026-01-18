// app/api/test-db/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. 测试简单查询
    const result = await prisma.$queryRaw`SELECT 1 as test`;

    // 2. 测试表是否存在
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    return NextResponse.json({
      success: true,
      message: "数据库连接成功",
      data: { result, tables },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,

        connectionString: process.env.DATABASE_URL?.replace(
          /:[^:@]+@/,
          ":****@",
        ),
      },
      { status: 500 },
    );
  }
}
