import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit store for middleware-level protection
const middlewareRateLimits = new Map<
  string,
  { count: number; windowStart: number }
>();

const API_RATE_LIMIT = 60; // requests per window
const API_RATE_WINDOW = 60 * 1000; // 1 minute

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkMiddlewareRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = middlewareRateLimits.get(ip);

  if (!entry || now - entry.windowStart > API_RATE_WINDOW) {
    middlewareRateLimits.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= API_RATE_LIMIT) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ─── HTTPS redirect in production ───
  if (
    process.env.NODE_ENV === "production" &&
    req.headers.get("x-forwarded-proto") === "http"
  ) {
    const httpsUrl = new URL(req.url);
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 301);
  }

  // ─── Rate limit all API routes ───
  if (pathname.startsWith("/api/")) {
    const ip = getClientIp(req);
    const allowed = checkMiddlewareRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }
  }

  // ─── Block access to sensitive paths ───
  const blockedPaths = ["/.env", "/.git", "/prisma", "/db"];
  if (blockedPaths.some((p) => pathname.startsWith(p))) {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
