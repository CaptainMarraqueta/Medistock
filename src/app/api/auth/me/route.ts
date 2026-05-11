// /app/api/auth/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/src/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const user = verifyToken(token);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}