import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/lib/copy";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", `${pathname}${search}`);

  const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
  if (pathname === "/" && preferred === "es") {
    const url = request.nextUrl.clone();
    url.pathname = "/es";
    return NextResponse.redirect(url);
  }

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    requestHeaders.set("x-locale", "es");
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/es/, "") || "/";
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  requestHeaders.set("x-locale", "en");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
