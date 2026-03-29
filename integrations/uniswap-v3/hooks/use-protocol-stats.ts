"use client"

import { useQuery } from "@tanstack/react-query"

import { getProtocolStats } from "../client"

export function useProtocolStats() {
  return useQuery({
    queryKey: ["uniswap-v3", "base", "protocol-stats"],
    queryFn: getProtocolStats,
  })
}
