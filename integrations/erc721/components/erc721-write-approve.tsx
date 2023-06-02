import { FormEvent, useState } from 'react'

import { BigNumber } from 'ethers'
import { useDebounce } from 'usehooks-ts'
import { useNetwork, useWaitForTransaction } from 'wagmi'

import { LinkComponent } from '@/components/shared/link-component'

import { useErc721Approve, usePrepareErc721Approve } from '../erc721-wagmi'
import { useErc721TokenStorage } from '../hooks/use-erc721-token-storage'

export function Erc721WriteApprove() {
  const [token] = useErc721TokenStorage()
  const [toAddress, setToAddress] = useState<string>('')
  const [tokenId, setTokenId] = useState<number>()
  const debouncedToAddress = useDebounce(toAddress, 500)
  const debouncedTokenId = useDebounce(tokenId, 500)

  const { chain } = useNetwork()

  const {
    config,
    error,
    isError,
    isLoading: isLoadingPrepare,
  } = usePrepareErc721Approve({
    address: token as `0x${string}`,
    args: [debouncedToAddress as `0x${string}`, BigNumber.from(debouncedTokenId || 0)],
  })

  const { data, write, isLoading: isLoadingWrite } = useErc721Approve(config)

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
        <label>Address</label>
        <input value={toAddress} onChange={(e) => setToAddress(e.target.value)} className="input" />
        <label>Token ID</label>
        <input value={tokenId} type="number" onChange={(e) => setTokenId(e.target.valueAsNumber)} className="input" />
        {isError && debouncedToAddress && debouncedTokenId && <span className="break-words text-red-500">{error?.message}</span>}
        <button type="submit" disabled={isLoadingPrepare || isLoadingWrite || isLoadingTx || !write} className="btn btn-emerald disabled:opacity-60">
          {isLoadingWrite ? 'Sign the transaction' : isLoadingTx ? 'Approving...' : 'Approve'}
        </button>
        {(isSuccess || isLoadingTx) && (
          <div className="flex items-center justify-between pt-5 pb-2">
            <span className="font-semibold">{isLoadingTx ? 'Approving NFT' : 'Successfully approved NFT'}:</span>
            <LinkComponent isExternal className="font-medium underline" href={`${chain?.blockExplorers?.default.url}/tx/${data?.hash}`}>
              See in block explorer
            </LinkComponent>
          </div>
        )}
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC721 Approve</h3>
          <p className="text-center text-sm text-gray-500">Approve NFTs to any address</p>
        </div>
      </form>
    </div>
  )
}
