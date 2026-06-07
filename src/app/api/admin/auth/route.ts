import { NextRequest, NextResponse } from "next/server";

// Simple token generation using Web Crypto API
async function generateToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET || "fallback-secret";
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
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
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
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = await generateToken();

    return NextResponse.json({
      token,
      message: "Authenticated successfully",
    });
  } catch (error) {
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

// Token verification helper — validates structure and expiry (24h)
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

    // Recompute hash
    const secret = process.env.ADMIN_SECRET || "fallback-secret";
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
