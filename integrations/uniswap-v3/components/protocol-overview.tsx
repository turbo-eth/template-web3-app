"use client"

import { Card, CardContent } from "@/components/ui/card"

import { useDailySnapshots } from "../hooks/use-daily-snapshots"
import { useProtocolStats } from "../hooks/use-protocol-stats"
import { formatCompactNumber, formatUsd } from "../utils"
import { StatCard } from "./stat-card"

export function ProtocolOverview() {
  const protocol = useProtocolStats()
  const snapshots = useDailySnapshots()

  if (protocol.isLoading || snapshots.isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="h-28 animate-pulse" />
          </Card>
        ))}
      </div>
    )
  }

  if (protocol.error || snapshots.error || !protocol.data) {
    return (
      <Card>
        <CardContent className="py-6 text-sm text-red-500">
          Failed to load Base protocol analytics from the public Uniswap V3
          subgraph.
        </CardContent>
      </Card>
    )
  }

  const latestSnapshot = snapshots.data?.[0]

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Cumulative Volume"
        value={formatUsd(protocol.data.cumulativeVolumeUSD, 0)}
        hint="Historical swap volume indexed on Base."
      />
      <StatCard
        label="Unique Users"
        value={formatCompactNumber(protocol.data.cumulativeUniqueUsers)}
        hint="Addresses seen interacting with the protocol."
      />
      <StatCard
        label="Pools Indexed"
        value={formatCompactNumber(protocol.data.totalPoolCount)}
        hint="All Base V3 pools currently represented in the subgraph."
      />
      <StatCard
        label="Latest Daily Revenue"
        value={
          latestSnapshot
            ? formatUsd(latestSnapshot.dailyTotalRevenueUSD, 0)
            : "-"
        }
        hint="Most recent daily revenue snapshot."
      />
    </div>
  )
}
