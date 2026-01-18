import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password, userName } = await request.json();

    // 输入验证
    if (!email || !password) {
      return NextResponse.json(
        { error: "邮箱和密码都是必填项" },
        { status: 400 },
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "请输入有效的邮箱地址" },
        { status: 400 },
      );
    }

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ error: "该邮箱已被注册" }, { status: 409 });
    }

    // 密码强度验证（至少6位）
    if (password.length < 6) {
      return NextResponse.json({ error: "密码长度至少为6位" }, { status: 400 });
    }

    // 加密密码
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 创建新用户
    const newUser = await prisma.user.create({
      data: {
        userName,
        email: email.toLowerCase(),
        password: hashedPassword,
        // 如果有其他字段如姓名等，可以在这里添加
      },
    });

    // 返回成功响应（不返回敏感信息）
    return NextResponse.json(
      {
        success: true,
        message: "注册成功",
        user: {
          id: newUser.id,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("注册错误:", error);

    // 对于未知错误，避免暴露服务器内部信息
    return NextResponse.json(
      { error: "注册失败，请稍后重试" },
      { status: 500 },
    );
  }
}
