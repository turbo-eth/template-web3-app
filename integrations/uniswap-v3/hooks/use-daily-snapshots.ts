"use client"

import { useQuery } from "@tanstack/react-query"

import { getDailySnapshots } from "../client"

export function useDailySnapshots() {
  return useQuery({
    queryKey: ["uniswap-v3", "base", "daily-snapshots"],
    queryFn: getDailySnapshots,
  })
}
