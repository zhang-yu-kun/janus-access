// import { prisma } from "@/utils/prisma";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { email, password, name } = body;

//     // 1. 基础输入验证
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "邮箱和密码是必填项" },
//         { status: 400 }
//       );
//     }

//     // 2. 检查邮箱是否已存在
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json({ error: "该邮箱已被注册" }, { status: 409 });
//     }

//     // 3. 加密密码
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 4. 创建用户（根据你的模型）
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         name: name || null,
//         emailVerified: null, // 注册时不验证邮箱（可选后续加）
//         image: null,
//         // 可选：分配默认角色
//         userRoles: {
//           create: {
//             role: { connect: { name: "user" } },
//           },
//         },
//       },
//     });

//     // 5. 返回成功（不返回密码！）
//     return NextResponse.json(
//       { success: true, userId: user.id, email: user.email },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("注册错误:", error);
//     return NextResponse.json(
//       { error: "注册失败，请稍后重试" },
//       { status: 500 }
//     );
//   }
// }
