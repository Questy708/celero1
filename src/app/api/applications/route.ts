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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: Record<string, string> = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const applications = await db.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Get applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "reviewing", "contacted", "accepted", "declined"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const application = await db.application.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Update application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
