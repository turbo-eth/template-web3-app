import Image from "next/image"

import { cn } from "@/lib/utils"

import { useERC721Metadata } from "../hooks/use-erc721-metadata"
import { ERC721Props } from "../utils/types"

interface ERC721TokenUriImageProps extends ERC721Props {
  tokenId: bigint
  height: number
  width: number
  alt?: string
}

export function ERC721TokenUriImage({
  address,
  chainId,
  className,
  tokenId,
  height,
  width,
  alt,
  ...props
}: ERC721TokenUriImageProps) {
  const metadata = useERC721Metadata({ address, chainId, tokenId })
  if (metadata.isLoading)
    return (
      <div
        className={cn(className, "animate-pulse bg-muted")}
        style={{ width, height }}
        {...props}
      />
    )

  if (!metadata.data?.image) return null

  return (
    <Image
      alt={alt ?? "ERC721 image"}
      className={className}
      height={height}
      src={metadata.data?.image}
      width={width}
    />
  )
}
