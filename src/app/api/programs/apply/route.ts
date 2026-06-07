import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { programSlug, firstName, lastName, email } = body;

    // Validate required fields
    if (!programSlug || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields: programSlug, firstName, lastName, email" },
        { status: 400 }
      );
    }

    // Validate program slug
    const validSlugs = ["xhansa-fellowship", "xcelero-accelerator", "inception-studios", "quest-fellowship"];
    if (!validSlugs.includes(programSlug)) {
      return NextResponse.json(
        { error: "Invalid program slug" },
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

    // Create program application
    const application = await db.programApplication.create({
      data: {
        programSlug,
        firstName,
        lastName,
        email,
        phone: body.phone || null,
        linkedinUrl: body.linkedinUrl || null,
        location: body.location || null,
        currentRole: body.currentRole || null,
        companyName: body.companyName || null,
        motivation: body.motivation || null,
        referral: body.referral || null,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        id: application.id,
        message: "Program application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Program application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
