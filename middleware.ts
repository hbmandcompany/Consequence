import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getHomeOrigin,
  getShopUrl,
  getSoftwareOrigin,
  isHomeHostname,
  isSoftwareHostname,
  normalizeHostname,
} from "@/lib/urls";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const hostname = normalizeHostname(host);
  const homeHost = isHomeHostname(host);
  const softwareHost = isSoftwareHostname(host);
  const { pathname, search } = request.nextUrl;

  if (homeHost) {
    if (hostname === "consequence.cc") {
      const destination = new URL(
        `${pathname}${search}`,
        getHomeOrigin() || "https://www.consequence.cc"
      );
      return NextResponse.redirect(destination, 308);
    }

    if (
      process.env.NODE_ENV === "production" &&
      (pathname === "/shop" || pathname === "/cc" || pathname.startsWith("/shop/"))
    ) {
      const shopBase = getShopUrl().replace(/\/$/, "");
      const suffix =
        pathname === "/shop" || pathname === "/cc"
          ? ""
          : pathname.replace(/^\/shop/, "") || "";
      return NextResponse.redirect(`${shopBase}${suffix}${search}`, 308);
    }

    return NextResponse.next();
  }

  if (softwareHost) {
    if (hostname === "consequence.software") {
      const destination = new URL(
        `${pathname}${search}`,
        getSoftwareOrigin() || "https://www.consequence.software"
      );
      return NextResponse.redirect(destination, 308);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
