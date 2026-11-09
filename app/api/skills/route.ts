import { NextResponse } from "next/server";
import { INITIAL_SKILLS, INITIAL_JOB_ROLES } from "@/lib/data/mock-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    skills: INITIAL_SKILLS,
    jobRoles: INITIAL_JOB_ROLES,
  });
}
