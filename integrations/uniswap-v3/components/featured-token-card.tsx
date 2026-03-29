"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useTokenSummary } from "../hooks/use-token-summary"
import { formatUsd } from "../utils"

interface FeaturedTokenCardProps {
  address: string
  label: string
}

export function FeaturedTokenCard({
  address,
  label,
}: FeaturedTokenCardProps) {
  const { data, isLoading, error } = useTokenSummary(address)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle>{data?.name ?? label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {isLoading ? (
          <div className="h-16 animate-pulse rounded bg-muted" />
        ) : error || !data ? (
          <p className="text-red-500">Token data unavailable.</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">
                {formatUsd(data.lastPriceUSD, 4)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">TVL</span>
              <span className="font-medium">
                {formatUsd(data._totalValueLockedUSD, 0)}
              </span>
            </div>
            <p className="truncate text-xs text-muted-foreground">{data.id}</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
