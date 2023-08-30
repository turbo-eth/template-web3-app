"use client"

import { useBlockNumber, useNetwork } from "wagmi"

import { cn } from "@/lib/utils"
import { GetNetworkColor } from "@/lib/utils/get-network-color"

import { LinkComponent } from "../shared/link-component"

type NetworkStatusProps = React.HTMLAttributes<HTMLDivElement>

export function NetworkStatus({ className, ...props }: NetworkStatusProps) {
  const block = useBlockNumber({ watch: true })
  const network = useNetwork()
  const explorerUrl = network.chain?.blockExplorers?.default.url
  const classes = cn(
    className,
    "z-10 flex items-center overflow-hidden rounded-full bg-gray-100 shadow-md dark:bg-gray-800"
  )
  const classesBadge = cn(
    "rounded-full px-2 text-xs font-bold uppercase leading-none tracking-wider",
    `bg-${GetNetworkColor(network.chain?.network)}-200`,
    `text-${GetNetworkColor(
      network.chain?.network
    )}-700 dark:text-${GetNetworkColor(network.chain?.network)}-700 py-2`
  )

  return (
    <div className={classes} {...props}>
      <span className={classesBadge}>
        <span className="px-1">{network.chain?.name ?? "Ethereum"}</span>
      </span>
      {explorerUrl && (
        <LinkComponent
          className="mx-3 text-2xs dark:hover:text-gray-200"
          href={explorerUrl}
        >
          <>#{block.data?.toString()}</>
        </LinkComponent>
      )}
      {!explorerUrl && (
        <span className="mx-3 text-2xs"># {block.data?.toString()}</span>
      )}
    </div>
  )
}
