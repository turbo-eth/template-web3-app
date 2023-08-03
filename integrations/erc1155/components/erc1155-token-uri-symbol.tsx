import { useERC1155Metadata } from '../hooks/use-erc1155-metadata'
import { ERC1155Props } from '../utils/types'

interface ERC1155TokenUriSymbolProps extends ERC1155Props {
  tokenId: bigint
}

export function ERC1155TokenUriSymbol({ address, chainId, className, tokenId, ...props }: ERC1155TokenUriSymbolProps) {
  const metadata = useERC1155Metadata({ address, chainId, tokenId })

  if (!metadata.data) return null

  return (
    <span className={className} {...props}>
      {metadata.data?.symbol}
    </span>
  )
}
