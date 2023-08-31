"use client"

import { useState } from "react"
import type { Address } from "wagmi"

import {
  ERC721Name,
  ERC721OwnerOf,
  ERC721Symbol,
  ERC721TokenUriDescription,
  ERC721TokenUriImage,
  ERC721TokenUriName,
  ERC721TotalSupply,
} from "../"

interface Erc721ReadProps {
  address: Address
}

export function Erc721Read({ address }: Erc721ReadProps) {
  const [tokenId, setTokenId] = useState<number>()

  const bigIntTokenId = BigInt(tokenId || 1)

  return (
    <div className="card w-full">
      <div className="flex flex-col justify-center gap-4">
        <label>Token ID</label>
        <input
          className="input"
          type="number"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.valueAsNumber)}
        />
        <ERC721TokenUriName
          address={address}
          className="mx-auto mt-4 text-lg font-medium"
          tokenId={bigIntTokenId}
        />
        <ERC721TokenUriImage
          address={address}
          className="mx-auto rounded-lg"
          height={200}
          tokenId={bigIntTokenId}
          width={200}
        />
        <ERC721TokenUriDescription
          address={address}
          className="mx-auto max-w-lg text-center"
          tokenId={bigIntTokenId}
        />
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between">
            <span className="font-medium">Contract Name:</span>
            <ERC721Name address={address} />
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <span className="font-medium">Contract Symbol:</span>
            <ERC721Symbol address={address} />
          </div>
          <div className="flex flex-wrap items-center justify-between break-words">
            <span className="font-medium">Token Owner:</span>
            <ERC721OwnerOf
              address={address}
              className="overflow-x-scroll"
              tokenId={BigInt(tokenId || 1)}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <span className="font-medium">Total Supply:</span>
            <ERC721TotalSupply address={address} />
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC721 Read</h3>
          <p className="text-center text-sm text-muted-foreground">
            See detailed NFT information
          </p>
        </div>
      </div>
    </div>
  )
}
