import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/src/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      const user: any = verifyToken(token);

      if (user.rol !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};