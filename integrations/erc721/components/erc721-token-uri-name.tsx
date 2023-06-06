import { useERC721Metadata } from '../hooks/use-erc721-metadata'
import { ERC721Props } from '../utils/types'

interface ERC721TokenUriNameProps extends ERC721Props {
  tokenId: number
}

export function ERC721TokenUriName({ address, chainId, className, tokenId, ...props }: ERC721TokenUriNameProps) {
  const metadata = useERC721Metadata({ address, chainId, tokenId })

  if (!metadata.data) return null

  return (
    <span className={className} {...props}>
      {metadata.data?.name}
    </span>
  )
}
