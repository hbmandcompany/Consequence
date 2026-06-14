import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getMainSiteOrigin,
  getShopUrl,
  isMainSiteHostname,
  isShopHostname,
  normalizeHostname,
} from "@/lib/urls";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const hostname = normalizeHostname(host);
  const shopHost = isShopHostname(host);
  const { pathname, search } = request.nextUrl;

  if (shopHost) {
    if (pathname === "/" || pathname === "") {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = "/shop";
      const response = NextResponse.rewrite(rewriteUrl);
      response.headers.set("x-consequence-surface", "shop");
      return response;
    }

    if (pathname === "/shop" || pathname === "/cc") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url, 308);
    }

    if (pathname.startsWith("/shop/")) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(/^\/shop/, "") || "/";
      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // Apex consequence.software often lands on GoDaddy until DNS is fixed; when it
  // reaches Vercel, send traffic to the canonical www host (marketing homepage).
  if (
    process.env.NODE_ENV === "production" &&
    hostname === "consequence.software"
  ) {
    const destination = new URL(
      `${pathname}${search}`,
      getMainSiteOrigin() || "https://www.consequence.software"
    );
    return NextResponse.redirect(destination, 308);
  }

  if (
    process.env.NODE_ENV === "production" &&
    isMainSiteHostname(host) &&
    (pathname === "/shop" || pathname === "/cc" || pathname.startsWith("/shop/"))
  ) {
    const shopBase = getShopUrl().replace(/\/$/, "");
    const suffix =
      pathname === "/shop" || pathname === "/cc"
        ? "/"
        : pathname.replace(/^\/shop/, "") || "/";
    return NextResponse.redirect(`${shopBase}${suffix}${search}`, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
