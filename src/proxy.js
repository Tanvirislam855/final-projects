import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const roleMatch = pathname.match(/^\/dashboard\/(admin|seller|buyer)(\/|$)/);
  if (!roleMatch) {
    return NextResponse.next();
  }

  const routeRole = roleMatch[1];

  const sessionDataCookie =
    request.cookies.get("__Secure-better-auth.session_data")?.value ||
    request.cookies.get("better-auth.session_data")?.value;

  const sessionTokenCookie =
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

  if (!sessionTokenCookie) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  if (!sessionDataCookie) {
    return NextResponse.next();
  }

  try {
    const parts = sessionDataCookie.split(".");
    if (parts.length !== 3) {
      return NextResponse.next();
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf-8"),
    );

    const userRole = payload?.user?.role;

    if (userRole && userRole !== routeRole) {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url),
      );
    }
  } catch {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
