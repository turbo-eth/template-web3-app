'use client'
import React from 'react'

import classNames from 'clsx'
import { useBlockNumber, useNetwork } from 'wagmi'

import { GetNetworkColor } from '@/lib/utils/get-network-color'

import { LinkComponent } from '../shared/link-component'

export function NetworkStatus({ className }: any) {
  const block = useBlockNumber({ watch: true })
  const network = useNetwork()
  const explorerUrl = network.chain?.blockExplorers?.default.url
  const classes = classNames(className, 'NetworkStatus', 'dark:bg-gray-800 bg-gray-100 z-10 flex shadow-md items-center rounded-full overflow-hidden')
  const classesBadge = classNames(
    'Badge uppercase text-xs font-bold tracking-wider leading-none rounded-full px-2',
    `bg-${GetNetworkColor(network.chain?.network)}-200`,
    `text-${GetNetworkColor(network.chain?.network)}-700 dark:text-${GetNetworkColor(network.chain?.network)}-700 py-2`
  )

  return (
    <div className={classes}>
      <span className={classesBadge}>
        <span className="px-1">{network.chain?.name ?? 'Ethereum'}</span>
      </span>
      {explorerUrl && (
        <LinkComponent href={explorerUrl} className="mx-3 text-2xs dark:hover:text-gray-200">
          <>#{block.data?.toString()}</>
        </LinkComponent>
      )}
      {!explorerUrl && <span className="mx-3 text-2xs"># {block.data?.toString()}</span>}
    </div>
  )
}
