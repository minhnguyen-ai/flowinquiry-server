import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware123 is executed " + request.nextUrl.pathname);
  if (request.nextUrl.pathname.startsWith("/api")) {
    console.log("Middleware is executed " + request.nextUrl.pathname);
  }
}
