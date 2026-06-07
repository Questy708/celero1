import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, firstName, lastName, email, referral } = body;

    // Validate required common fields
    if (!type || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields: type, firstName, lastName, email" },
        { status: 400 }
      );
    }

    // Validate type
    if (!["founder", "partner"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid application type. Must be 'founder' or 'partner'" },
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

    // Validate founder-specific fields
    if (type === "founder") {
      const { linkedinUrl, companyName, location, role, pitchDeckUrl, motivation } = body;
      if (!linkedinUrl || !companyName || !location || !role || !pitchDeckUrl || !motivation) {
        return NextResponse.json(
          { error: "Missing required founder fields" },
          { status: 400 }
        );
      }
    }

    // Validate partner-specific fields
    if (type === "partner") {
      const { orgName, partnerRole, interest, description } = body;
      if (!orgName || !partnerRole || !interest || !description) {
        return NextResponse.json(
          { error: "Missing required partner fields" },
          { status: 400 }
        );
      }
    }

    // Create application
    const application = await db.application.create({
      data: {
        type,
        firstName,
        lastName,
        email,
        referral: referral || null,
        // Founder-specific
        linkedinUrl: body.linkedinUrl || null,
        companyName: body.companyName || null,
        companyWebsite: body.companyWebsite || null,
        location: body.location || null,
        role: body.role || null,
        pitchDeckUrl: body.pitchDeckUrl || null,
        motivation: body.motivation || null,
        // Partner-specific
        orgName: body.orgName || null,
        orgWebsite: body.orgWebsite || null,
        partnerRole: body.partnerRole || null,
        interest: body.interest || null,
        description: body.description || null,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        id: application.id,
        message: "Application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET and PATCH endpoints removed for security - application data is only accessible via admin dashboard
export async function GET() {
  return NextResponse.json(
    { error: "This endpoint is not publicly accessible" },
    { status: 403 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: "This endpoint is not publicly accessible" },
    { status: 403 }
  );
}
