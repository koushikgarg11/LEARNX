import { NextRequest, NextResponse } from "next/server";
import { CURRENT_LEARNER } from "@/lib/data/mock-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    learner: CURRENT_LEARNER,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = {
      ...CURRENT_LEARNER,
      ...body,
      digitalTwin: {
        ...CURRENT_LEARNER.digitalTwin,
        ...(body.digitalTwin || {}),
      },
    };

    return NextResponse.json({
      success: true,
      learner: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
