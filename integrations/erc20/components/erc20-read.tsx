import { HTMLAttributes } from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { formatUnits } from 'viem'
import { Address, useAccount } from 'wagmi'

import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'

import { useErc20BalanceOf, useErc20Decimals, useErc20Name, useErc20Symbol, useErc20TotalSupply } from '../generated/erc20-wagmi'

interface ERC20Props extends HTMLAttributes<HTMLElement> {
  address: Address
}

interface ERC20ChainIdProps extends ERC20Props {
  chainId?: number
}

export function ERC20Image({ address, ...props }: ERC20Props) {
  return (
    <img
      alt={`Token ${address} icon`}
      className="mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md"
      src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
      {...props}
    />
  )
}

export function ERC20Name({ address, chainId, className, ...props }: ERC20ChainIdProps) {
  const { data } = useErc20Name({
    address,
    chainId,
  })
  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}

export function ERC20Symbol({ address, chainId, className, ...props }: ERC20ChainIdProps) {
  const { data } = useErc20Symbol({
    address,
    chainId,
  })
  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}

export function ERC20TotalSupply({ address, chainId, className, ...props }: ERC20ChainIdProps) {
  const { data: decimals } = useErc20Decimals({
    address,
    chainId,
  })

  const { data } = useErc20TotalSupply({
    address,
    chainId,
  })
  return (
    <span className={className} {...props}>
      {formatUnits(data || BigInt(0), decimals || 1)}
    </span>
  )
}

// @TODO: Add Decimals to Display
export function ERC20Decimals({ address, chainId, className, ...props }: ERC20ChainIdProps) {
  const { data } = useErc20Decimals({
    address,
    chainId,
  })
  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}

export function ERC20Balance({ address, chainId, className, ...props }: ERC20ChainIdProps) {
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

  return (
    <span className={className} {...props}>
      {' '}
      {formatUnits(data, decimals)}
    </span>
  )
}

export function ERC20Read({ address, ...props }: ERC20Props) {
  return (
    <>
      <IsWalletConnected>
        <div className="card w-full" {...props}>
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
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="flex items-center justify-center gap-10">
          <ConnectButton />
        </div>
      </IsWalletDisconnected>
    </>
  )
}
