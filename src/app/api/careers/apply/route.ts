import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, role } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email, role" },
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

    // Create job application
    const application = await db.jobApplication.create({
      data: {
        firstName,
        lastName,
        email,
        phone: body.phone || null,
        linkedinUrl: body.linkedinUrl || null,
        portfolioUrl: body.portfolioUrl || null,
        role,
        location: body.location || null,
        availability: body.availability || null,
        motivation: body.motivation || null,
        referral: body.referral || null,
        resumeUrl: body.resumeUrl || null,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        id: application.id,
        message: "Job application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
