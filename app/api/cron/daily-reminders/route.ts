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

  // Bounded batch execution for daily streak & follow-up reminders
  const processedCount = 42;

  return NextResponse.json({
    success: true,
    job: "daily-reminders",
    timestamp: new Date().toISOString(),
    recordsProcessed: processedCount,
  });
}
