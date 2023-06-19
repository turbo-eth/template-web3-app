import { HTMLAttributes } from 'react'

import { useAccount, useEnsName } from 'wagmi'

export const WalletEnsName = ({ className, ...props }: Omit<HTMLAttributes<HTMLSpanElement>, 'children'>) => {
  const { address } = useAccount()
  // Chain ID is hardcoded to 1 since wagmi ENS resolve is only available on Ethereum Mainnet
  const { data: ensName, isSuccess } = useEnsName({ address, chainId: 1 })

  if (!address || !ensName || !isSuccess) return null

  return (
    <span className={className} {...props}>
      {ensName}
    </span>
  )
}
