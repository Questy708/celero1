import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, consent, source } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Require consent
    if (!consent) {
      return NextResponse.json(
        { error: "Consent is required" },
        { status: 400 }
      );
    }

    // Upsert subscriber
    const subscriber = await db.subscriber.upsert({
      where: { email },
      update: {
        consent: true,
        source: source || "capital_page",
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
      },
      create: {
        email,
        consent: true,
        source: source || "capital_page",
        firstName: firstName || null,
        lastName: lastName || null,
      },
    });

    return NextResponse.json(
      {
        id: subscriber.id,
        message: "Subscribed successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await db.subscriber.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error("Get subscribers error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
