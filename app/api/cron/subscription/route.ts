import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export function GET(request: Request) {
  return NextResponse.json({
    success: true,
    timestamp: Math.floor(Date.now() / 1000),
    schedule: "*/30 * * * *",
    status: "active",
    message: "Delegatable subscription cron endpoint active.",
  })
}

export function POST(request: Request) {
  return GET(request)
}
