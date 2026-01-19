import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      include: {
        userRoles: {
          include: {
            user: {
              select: {
                id: true,
                userName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      code: 1,
      message: "获取角色列表成功",
      data: roles,
    });
  } catch (error) {
    console.error("获取角色列表错误:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
