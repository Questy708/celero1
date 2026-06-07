import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, amount, tier, accredited, consent } = body;

    // Validate required fields
    if (!name || !email || !amount || !tier || consent === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid investment amount" },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers = ["scout", "syndicate", "partner", "anchor"];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: "Invalid investment tier" },
        { status: 400 }
      );
    }

    // Validate tier minimums
    const tierMinimums: Record<string, number> = {
      scout: 500,
      syndicate: 5000,
      partner: 50000,
      anchor: 250000,
    };

    if (numAmount < tierMinimums[tier]) {
      return NextResponse.json(
        {
          error: `Minimum investment for ${tier} tier is $${tierMinimums[tier].toLocaleString()}`,
        },
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

    // Create inquiry
    const inquiry = await db.investmentInquiry.create({
      data: {
        name,
        email,
        amount: numAmount,
        tier,
        accredited: Boolean(accredited),
        consent: Boolean(consent),
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        id: inquiry.id,
        message: "Investment inquiry submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Investment inquiry error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tier = searchParams.get("tier");
    const status = searchParams.get("status");

    const where: Record<string, string> = {};
    if (tier) where.tier = tier;
    if (status) where.status = status;

    const inquiries = await db.investmentInquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("Get inquiries error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
