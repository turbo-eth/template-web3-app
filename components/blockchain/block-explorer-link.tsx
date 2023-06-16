import { HTMLAttributes } from 'react'

import { Address, useNetwork } from 'wagmi'

import { cn } from '@/lib/utils'

interface BlockExplorerLinkProps extends HTMLAttributes<HTMLSpanElement> {
  address: Address | undefined
  showExplorerName?: boolean
  type?: 'address' | 'tx'
}

export const BlockExplorerLink = ({ address, children, className, showExplorerName, type = 'address', ...props }: BlockExplorerLinkProps) => {
  const { chain } = useNetwork()
  const blockExplorer = chain?.blockExplorers?.default

  if (!address) return null

  return (
    <span className={cn('overflow-x-auto font-medium underline', className)} {...props}>
      {blockExplorer && (
        <a href={`${blockExplorer.url}/${type}/${address}`} rel="noreferrer" target="_blank">
          {showExplorerName ? blockExplorer.name : children ?? address}
        </a>
      )}
    </span>
  )
}
