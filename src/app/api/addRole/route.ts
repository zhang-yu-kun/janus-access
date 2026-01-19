import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    // 验证必要字段
    if (!name) {
      return NextResponse.json({ error: "角色名称不能为空" }, { status: 400 });
    }

    // 检查角色是否已存在
    const existingRole = await prisma.role.findUnique({
      where: { name },
    });

    if (existingRole) {
      return NextResponse.json({ error: "角色已存在" }, { status: 409 });
    }

    // 创建新角色
    const newRole = await prisma.role.create({
      data: {
        name,
        description: description || null,
      },
    });

    return NextResponse.json({
      code: 1,
      message: "角色创建成功",
      data: newRole,
    });
  } catch (error) {
    console.error("创建角色错误:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
