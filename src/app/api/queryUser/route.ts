import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 查询所有用户（排除密码字段）
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        // 根据需要添加其他字段，但不要包含密码
      },
      orderBy: {
        createdAt: "desc", // 按创建时间倒序排列
      },
    });

    return NextResponse.json(
      {
        success: true,
        users,
        count: users.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("查询所有用户错误:", error);

    return NextResponse.json(
      { error: "查询失败，请稍后重试" },
      { status: 500 },
    );
  }
}
