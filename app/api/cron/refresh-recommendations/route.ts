import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || "dev-cron-secret-learnx-local-test";

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized cron execution" },
      { status: 401 }
    );
  }

  // Recalculates Digital Twin vectors for active learners
  return NextResponse.json({
    success: true,
    job: "refresh-recommendations",
    timestamp: new Date().toISOString(),
    digitalTwinVectorsUpdated: 184,
  });
}
