import { handlers } from "@/lib/auth"; // Referring to the auth.ts we just created

export const runtime = "nodejs";
export const { GET, POST } = handlers;
