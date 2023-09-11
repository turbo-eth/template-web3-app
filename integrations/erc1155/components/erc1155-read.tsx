import React, { useState } from "react"
import type { Address } from "wagmi"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import {
  ERC1155ContractUri,
  Erc1155Name,
  Erc1155OwnerOf,
  Erc1155Symbol,
  ERC1155TokenTotalSupply,
  ERC1155TokenUri,
  ERC1155TokenUriDescription,
  ERC1155TokenUriImage,
  ERC1155TokenUriName,
} from ".."

interface Erc1155ReadProps {
  address: Address
}

export function Erc1155Read({ address }: Erc1155ReadProps) {
  const [tokenId, setTokenId] = useState<number>()
  const bigIntTokenId = BigInt(tokenId || 1)

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col justify-center gap-4">
          <label>Token ID</label>
          <input
            className="input"
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.valueAsNumber)}
          />
          <ERC1155TokenUriName
            address={address}
            className="mx-auto mt-4 text-lg font-medium"
            tokenId={bigIntTokenId}
          />
          <ERC1155TokenUriImage
            address={address}
            className="mx-auto rounded-lg"
            height={200}
            tokenId={bigIntTokenId}
            width={200}
          />
          <ERC1155TokenUriDescription
            address={address}
            className="mx-auto max-w-lg text-center"
            tokenId={bigIntTokenId}
          />
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between">
              <span className="font-medium">Contract Name:</span>
              <Erc1155Name address={address} />
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <span className="font-medium">Contract Symbol:</span>
              <Erc1155Symbol address={address} />
            </div>
            <div className="flex flex-wrap items-center justify-between break-words">
              <span className="font-medium">Owner:</span>
              <Erc1155OwnerOf
                address={address}
                className="overflow-x-scroll"
                tokenId={BigInt(tokenId || 1)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <span className="font-medium">Total Supply:</span>
              <ERC1155TokenTotalSupply
                address={address}
                tokenId={BigInt(tokenId || 1)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between break-words">
              <span className="font-medium">Token URI:</span>
              <ERC1155TokenUri
                address={address}
                className="max-w-full"
                tokenId={BigInt(tokenId || 1)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between break-words">
              <span className="font-medium">Contract URI:</span>
              <ERC1155ContractUri address={address} className="max-w-full" />
            </div>
          </div>
        </div>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="justify-between">
        <h3 className="text-center">ERC1155 Read</h3>
        <p className="text-center text-sm text-gray-500">
          See detailed NFT/SFT information
        </p>
      </CardFooter>
    </Card>
  )
}
