import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const menus = await prisma.menu.findMany();

    if (menus.length > 0) {
      return NextResponse.json(
        { code: 1, message: "获取用户菜单成功", data: menus },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
