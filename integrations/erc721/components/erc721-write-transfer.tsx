import { FormEvent, useState } from 'react'

import { BigNumber } from 'ethers'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useNetwork, useWaitForTransaction } from 'wagmi'

import { LinkComponent } from '@/components/shared/link-component'

import { useErc721SafeTransferFrom, usePrepareErc721SafeTransferFrom } from '../erc721-wagmi'

interface Erc721WriteTransferProps {
  address: `0x${string}`
}

export function Erc721WriteTransfer({ address }: Erc721WriteTransferProps) {
  const [differentFromAddress, setDifferentFromAddress] = useState<boolean>(false)
  const [tokenId, setTokenId] = useState<number>()
  const [fromAddress, setFromAddress] = useState<string>('')
  const [toAddress, setToAddress] = useState<string>('')

  const debouncedTokenId = useDebounce(tokenId, 500)
  const debouncedFromAddress = useDebounce(fromAddress, 500)
  const debouncedToAddress = useDebounce(toAddress, 500)

  const { address: accountAddress } = useAccount()
  const { chain } = useNetwork()

  const transferFromAddress = differentFromAddress ? debouncedFromAddress : accountAddress

  const {
    config,
    error,
    isError,
    isLoading: isLoadingPrepare,
  } = usePrepareErc721SafeTransferFrom({
    address,
    args: [transferFromAddress as `0x${string}`, debouncedToAddress as `0x${string}`, BigNumber.from(debouncedTokenId || 0)],
  })

  const { data, write, isLoading: isLoadingWrite } = useErc721SafeTransferFrom(config)

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    write?.()
  }

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex items-center justify-between text-sm">
          <label>Use different from address</label>
          <div className="h-6 w-6">
            <input type="checkbox" checked={differentFromAddress} onChange={(e) => setDifferentFromAddress(e.target.checked)} className="input" />
          </div>
        </div>
        {differentFromAddress && (
          <>
            <label>From Address</label>
            <input value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} className="input" />
          </>
        )}
        <label>To Address</label>
        <input value={toAddress} onChange={(e) => setToAddress(e.target.value)} className="input" />
        <label>Token ID</label>
        <input value={tokenId} type="number" onChange={(e) => setTokenId(e.target.valueAsNumber)} className="input" />
        {isError && debouncedToAddress && debouncedTokenId && <span className="break-words text-red-500">{error?.message}</span>}
        <button
          type="submit"
          disabled={isLoadingPrepare || isLoadingWrite || isLoadingTx || !write || !tokenId}
          className="btn btn-emerald disabled:opacity-60">
          {isLoadingWrite ? 'Sign the transaction' : isLoadingTx ? 'Transferring...' : 'Transfer'}
        </button>
        {(isSuccess || isLoadingTx) && (
          <div className="flex items-center justify-between pt-5 pb-2">
            <span className="font-semibold">{isLoadingTx ? 'Transferring NFT' : 'Successfully transferred NFT'}:</span>
            <LinkComponent isExternal className="font-medium underline" href={`${chain?.blockExplorers?.default.url}/tx/${data?.hash}`}>
              See in block explorer
            </LinkComponent>
          </div>
        )}
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC721 Transfer</h3>
          <p className="text-center text-sm text-gray-500">Transfer NFTs to any address</p>
        </div>
      </form>
    </div>
  )
}
