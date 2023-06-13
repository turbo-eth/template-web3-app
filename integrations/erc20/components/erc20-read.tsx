import { ConnectButton } from '@rainbow-me/rainbowkit'
import { formatUnits } from 'viem'
import { Address, useAccount } from 'wagmi'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'

import { useErc20BalanceOf, useErc20Decimals, useErc20Name, useErc20Symbol, useErc20TotalSupply } from '../generated/erc20-wagmi'

export function ERC20Image({ address }: { address: Address; className?: string }) {
  return (
    <img
      alt={`Token ${address} icon`}
      className="mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md"
      src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
    />
  )
}

export function ERC20Name({ address, chainId, className }: { address?: Address; chainId?: number; className?: string }) {
  const { data } = useErc20Name({
    address,
    chainId,
  })
  return <span className={className}>{data}</span>
}

export function ERC20Symbol({ address, chainId, className }: { address?: Address; chainId?: number; className?: string }) {
  const { data } = useErc20Symbol({
    address,
    chainId,
  })
  return <span className={className}>{data}</span>
}

export function ERC20TotalSupply({ address, chainId, className }: { address?: Address; chainId?: number; className?: string }) {
  const { data: decimals } = useErc20Decimals({
    address,
    chainId,
  })

  const { data } = useErc20TotalSupply({
    address,
    chainId,
  })
  return <span className={className}>{formatUnits(data || BigInt(0), decimals || 1)}</span>
}

// @TODO: Add Decimals to Display
export function ERC20Decimals({ address, chainId, className }: { address?: Address; chainId?: number; className?: string }) {
  const { data } = useErc20Decimals({
    address,
    chainId,
  })
  return <span className={className}>{data}</span>
}

export function ERC20Balance({ address, chainId, className }: { address?: Address; chainId?: number; className?: string }) {
  const { address: accountAddress } = useAccount()
  const { data: decimals } = useErc20Decimals({
    address,
    chainId,
  })
  const { data } = useErc20BalanceOf({
    chainId,
    address,
    args: accountAddress ? [accountAddress] : undefined,
    watch: true,
  })

  if (!data || !decimals) return null

  return <span className={className}> {formatUnits(data, decimals)}</span>
}

interface ERC20ReadProps {
  address: Address
}

export function ERC20Read({ address }: ERC20ReadProps) {
  return (
    <BranchIsWalletConnected>
      <div className="card w-full">
        <div className="flex items-center justify-center space-x-6">
          <div className="text-center">
            <span className="text-3xl">
              <ERC20Name address={address} />
              <span className="ml-2">
                (
                <ERC20Symbol address={address} />)
              </span>
            </span>
            <div className="my-4 flex items-center justify-center gap-4">
              <span className="font-medium">
                Decimals <ERC20Decimals address={address} />
              </span>
              <span className="">|</span>
              <span className="font-medium">
                Total Supply <ERC20TotalSupply address={address} />
              </span>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC20 Read</h3>
          <p className="text-center text-sm text-gray-500">Read core ERC20 token storage values</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10">
        <ConnectButton />
      </div>
    </BranchIsWalletConnected>
  )
}
