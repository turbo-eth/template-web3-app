"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useDailySnapshots } from "../hooks/use-daily-snapshots"
import { formatSnapshotDate, formatUsd } from "../utils"

export function DailySnapshotsTable() {
  const { data, isLoading, error } = useDailySnapshots()

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Activity</CardTitle>
        <CardDescription>
          Daily Base snapshots from the public Uniswap V3 Goldsky endpoint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-10 animate-pulse rounded bg-muted" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">
            Failed to load recent daily snapshots.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b">
                  <th className="py-3 pr-4 font-medium">Day</th>
                  <th className="py-3 pr-4 font-medium">Volume</th>
                  <th className="py-3 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((snapshot) => (
                  <tr key={snapshot.id} className="border-b last:border-b-0">
                    <td className="py-3 pr-4">
                      {formatSnapshotDate(snapshot.timestamp)}
                    </td>
                    <td className="py-3 pr-4">
                      {formatUsd(snapshot.dailyVolumeUSD, 0)}
                    </td>
                    <td className="py-3">
                      {formatUsd(snapshot.dailyTotalRevenueUSD, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
