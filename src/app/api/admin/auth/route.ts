import { NextRequest, NextResponse } from "next/server";

// ─── Rate Limiting (in-memory, per-IP) ───
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true };
  }

  // Reset window if expired
  if (now - entry.lastAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfterMs = WINDOW_MS - (now - entry.lastAttempt);
    return { allowed: false, retryAfterMs };
  }

  entry.count += 1;
  entry.lastAttempt = now;
  return { allowed: true };
}

function recordFailedAttempt(ip: string) {
  const entry = loginAttempts.get(ip);
  if (entry) {
    entry.count += 1;
    entry.lastAttempt = Date.now();
  } else {
    loginAttempts.set(ip, { count: 1, lastAttempt: Date.now() });
  }
}

function resetRateLimit(ip: string) {
  loginAttempts.delete(ip);
}

// ─── Token Generation using Web Crypto API ───
function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SECRET environment variable is not set. Refusing to proceed with fallback.");
  }
  return secret;
}

async function generateToken(): Promise<string> {
  const secret = getAdminSecret();
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 15);
  const data = `${secret}:${timestamp}:${randomPart}`;

  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // Token format: timestamp.randomPart.hash
  return `${timestamp}.${randomPart}.${hashHex}`;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later.", retryAfter: Math.ceil((rateCheck.retryAfterMs || 0) / 1000) },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Input length validation
    if (typeof password !== "string" || password.length > 256) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD env variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Reset rate limit on successful login
    resetRateLimit(ip);

    const token = await generateToken();

    return NextResponse.json({
      token,
      message: "Authenticated successfully",
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("ADMIN_SECRET")) {
      console.error("Security config error:", error.message);
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Verify a token
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const isValid = await verifyToken(token);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Token verification helper: validates structure and expiry (24h)
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [timestampStr, randomPart, hashHex] = parts;
    const timestamp = parseInt(timestampStr, 10);

    // Check if token is expired (24 hours)
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    if (now - timestamp > maxAge) return false;

    // Recompute hash - MUST use env var, no fallback
    const secret = process.env.ADMIN_SECRET;
    if (!secret) return false; // If no secret configured, all tokens invalid

    const data = `${secret}:${timestampStr}:${randomPart}`;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const recomputedHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return recomputedHash === hashHex;
  } catch {
    return false;
  }
}
