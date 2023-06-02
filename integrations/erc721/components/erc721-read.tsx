import { useState } from 'react'

import { ERC721Name, ERC721OwnerOf, ERC721Symbol, ERC721TokenUriDescription, ERC721TokenUriImage, ERC721TokenUriName, ERC721TotalSupply } from '../'
import { useErc721TokenStorage } from '../hooks/use-erc721-token-storage'

export function Erc721Read() {
  const [token] = useErc721TokenStorage()
  const [tokenId, setTokenId] = useState<number>()

  return (
    <div className="card w-full">
      <div className="flex flex-col justify-center gap-4">
        <label>Token ID</label>
        <input value={tokenId} type="number" onChange={(e) => setTokenId(e.target.valueAsNumber)} className="input" />
        <ERC721TokenUriName className="mx-auto mt-4 text-lg font-medium" tokenId={tokenId || 1} address={token as `0x${string}`} />
        <ERC721TokenUriImage className="mx-auto rounded-lg" height={200} width={200} tokenId={tokenId || 1} address={token as `0x${string}`} />
        <ERC721TokenUriDescription className="mx-auto max-w-lg text-center" tokenId={tokenId || 1} address={token as `0x${string}`} />
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between">
            <span className="font-medium">Contract Name:</span>
            <ERC721Name address={token as `0x${string}`} />
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <span className="font-medium">Contract Symbol:</span>
            <ERC721Symbol address={token as `0x${string}`} />
          </div>
          <div className="flex flex-wrap items-center justify-between break-words">
            <span className="font-medium">Token Owner:</span>
            <ERC721OwnerOf className="overflow-x-scroll" tokenId={tokenId || 1} address={token as `0x${string}`} />
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <span className="font-medium">Total Supply:</span>
            <ERC721TotalSupply address={token as `0x${string}`} />
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC721 Read</h3>
          <p className="text-center text-sm text-gray-500">See detailed NFT information</p>
        </div>
      </div>
    </div>
  )
}
