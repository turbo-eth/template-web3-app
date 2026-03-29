"use client"

import { useQuery } from "@tanstack/react-query"

import { getTokenSummary } from "../client"

export function useTokenSummary(address?: string) {
  return useQuery({
    queryKey: ["uniswap-v3", "base", "token-summary", address?.toLowerCase()],
    queryFn: () => getTokenSummary(address as string),
    enabled: Boolean(address),
  })
}
