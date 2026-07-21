import { dbConnect } from "@/lib/mongodb";
import CollegeRequest from "@/lib/models/CollegeRequest";
import { NextResponse } from "next/server";
import { COLLEGE_DOMAIN_MAP } from "@/lib/collegeMap";

export async function GET() {
  await dbConnect();

  try {
    const dbColleges = await CollegeRequest.find(
      { status: "Approved" },
      { college_name: 1, email_domain: 1, _id: 0 }
    ).sort({ college_name: 1 });

    const colleges = dbColleges.map((c) => ({
      name: c.college_name,
      domain: c.email_domain || COLLEGE_DOMAIN_MAP[c.college_name] || "college.edu",
    }));

    return NextResponse.json({
      success: true,
      colleges,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
