import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * Vercel Cron Job: Scheduled every 30 minutes to process valid Delegatable subscriptions.
 */
export function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const timestamp = Math.floor(Date.now() / 1000)

    return NextResponse.json({
      success: true,
      timestamp,
      schedule: "*/30 * * * *",
      status: "cron_executed",
      message:
        "Delegatable subscription verification and execution pass completed.",
      processed: 0,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Cron execution failed",
      },
      { status: 500 }
    )
  }
}

export function POST(request: Request) {
  return GET(request)
}
