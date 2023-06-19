import { HTMLAttributes } from 'react'

import { useAccount } from 'wagmi'

import { Address } from './address'

export interface WalletAddressProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  truncate?: boolean
  isLink?: boolean
}
export const WalletAddress = ({ className, truncate, isLink, ...props }: WalletAddressProps) => {
  const { address } = useAccount()

  if (!address) return null

  return <Address address={address} className={className} isLink={isLink} truncate={truncate} {...props} />
}
