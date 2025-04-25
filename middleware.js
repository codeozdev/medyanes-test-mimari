// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Admin kontrolü
    const isAdminRoute =
      req.nextUrl.pathname.startsWith("/products/new") || req.nextUrl.pathname.includes("/edit");

    if (isAdminRoute && req.nextauth.token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Giriş yapmadan erişilebilen sayfalar
        if (
          path.startsWith("/login") ||
          path.startsWith("/register") ||
          path.startsWith("/about") || // Hakkımızda sayfası eklendi
          path === "/"
        ) {
          return true;
        }

        // Eğer token yoksa ve korumalı sayfaya erişmeye çalışıyorsa
        if (!token && path.startsWith("/(app)")) {
          return false; // false dönerse otomatik olarak pages.signIn'e yönlendirilir
        }

        return !!token; // Token varsa true döner
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
