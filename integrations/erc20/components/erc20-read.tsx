import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BigNumber, utils } from 'ethers'
import { useErc20Decimals, useErc20Name, useErc20Symbol, useErc20TotalSupply } from '../erc20-wagmi'
import { useTokenStorage } from '../use-token-storage'

export function ERC20Image({ address }: { address?: `0x${string}`; className?: string }) {
  return (
    <img
      alt={`Token ${address} icon`}
      className="mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md"
      src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
    />
  )
}

export function ERC20Name({ address, className }: { address?: `0x${string}`; className?: string }) {
  const { data } = useErc20Name({
    address: address,
  })
  return <span className={className}>{data}</span>
}

export function ERC20Symbol({ address, className }: { address?: `0x${string}`; className?: string }) {
  const { data } = useErc20Symbol({
    address: address,
  })
  return <span className={className}>{data}</span>
}

export function ERC20TotalSupply({ address, className }: { address?: `0x${string}`; className?: string }) {
  const { data } = useErc20TotalSupply({
    address: address,
  })
  return <span className={className}>{utils.formatUnits(data || BigNumber.from(0))}</span>
}

// @TODO: Add Decimals to Display
export function ERC20Decimals({ address, className }: { address?: `0x${string}`; className?: string }) {
  const { data } = useErc20Decimals({
    address: address,
  })
  return <span className={className}>{data}</span>
}

export function ERC20Read() {
  const [token] = useTokenStorage()

  return (
    <BranchIsWalletConnected>
      <div>
        <div className="flex items-center justify-center space-x-6">
          <div className="text-center">
            <span className="text-3xl">
              <ERC20Name address={token as `0x${string}`} />
              <span className="ml-2">
                (
                <ERC20Symbol address={token as `0x${string}`} />)
              </span>
            </span>
            <div className="flex justify-center items-center gap-4 my-4">
              <span className="font-medium">
                Decimals <ERC20Decimals address={token as `0x${string}`} />
              </span>
              <span className="">|</span>
              <span className="font-medium">
                Total Supply <ERC20TotalSupply address={token as `0x${string}`} />
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
        <>
          <ConnectButton />
        </>
      </div>
    </BranchIsWalletConnected>
  )
}
