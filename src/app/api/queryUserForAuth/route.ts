import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 解析请求体中的邮箱参数
    const body = await request.json();
    const { email, password } = body;

    // 验证邮箱参数
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "无效的邮箱地址" }, { status: 400 });
    }

    // 根据邮箱查询用户（排除密码字段）
    const userPassward = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
      select: {
        password: true,
      },
    });
    if (userPassward !== password) {
      return NextResponse.json({ error: "密码错误" }, { status: 400 });
    }

    if (!userPassward) {
      return NextResponse.json({ error: "用户不存在" }, { status: 404 });
    }

    return NextResponse.json({ success: true, status: 200 });
  } catch (error) {
    console.error("根据邮箱查询用户错误:", error);

    return NextResponse.json(
      { error: "查询失败，请稍后重试" },
      { status: 500 },
    );
  }
}
