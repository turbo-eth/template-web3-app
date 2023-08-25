"use client"

import Link from "next/link"
import { useBlockNumber, useNetwork } from "wagmi"

import { cn } from "@/lib/utils"
import { GetNetworkColor } from "@/lib/utils/get-network-color"
import { Badge } from "@/components/ui/badge"

export function NetworkStatus() {
  const { data } = useBlockNumber()
  const { chain } = useNetwork()
  const blockExplorerUrl = chain?.blockExplorers?.default.url

  if (!chain || !blockExplorerUrl) return null

  return (
    <Link
      href={blockExplorerUrl}
      className="fixed bottom-6 left-6 z-10 flex items-center overflow-hidden rounded-full bg-muted text-muted-foreground shadow-md"
    >
      <Badge
        className={cn(
          "rounded-full text-xs font-bold uppercase leading-none tracking-wider",
          `bg-${GetNetworkColor(chain.network)}-200 text-${GetNetworkColor(
            chain.network
          )}-700 py-2`
        )}
      >
        {chain.name}
      </Badge>
      <p className="mx-2 text-xs">#{data?.toString()}</p>
    </Link>
  )
}
