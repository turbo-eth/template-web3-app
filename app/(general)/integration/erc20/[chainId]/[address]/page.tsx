"use client"

import { Address } from "wagmi"

import { ERC20Read } from "@/integrations/erc20/components/erc20-read"

export default function ERC20({
  params,
}: {
  params: { address: Address; chainId: string }
}) {
  const { address, chainId } = params

  return (
    <div className="container max-w-xl pt-20">
      <ERC20Read
        showBalance
        showImage
        address={address}
        chainId={Number(chainId)}
      />
    </div>
  )
}
