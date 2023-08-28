import Image from 'next/image'

import { cn } from '@/lib/utils'

import { useERC1155Metadata } from '../hooks/use-erc1155-metadata'
import { ERC1155Props } from '../utils/types'

interface ERC1155TokenUriImageProps extends ERC1155Props {
  tokenId: bigint
  height: number
  width: number
  alt?: string
}

export function ERC1155TokenUriImage({ address, chainId, className, tokenId, height, width, alt, ...props }: ERC1155TokenUriImageProps) {
  const metadata = useERC1155Metadata({ address, chainId, tokenId })
  if (metadata.isLoading) return <div className={cn(className, 'animate-pulse bg-gray-200')} style={{ width, height }} {...props} />

  if (!metadata.data?.image) return null

  return <Image alt={alt ?? 'ERC1155 image'} className={className} height={height} src={metadata.data?.image} width={width} />
}
