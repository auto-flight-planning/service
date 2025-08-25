import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasAuthSession = request.cookies.has(
    "sb-ysjpcqpcxtvaddfagtqw-auth-token"
  );
  if (pathname === "/" && hasAuthSession) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (pathname !== "/" && !hasAuthSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
