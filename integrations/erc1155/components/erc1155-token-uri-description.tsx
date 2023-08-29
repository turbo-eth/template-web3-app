import { useERC1155Metadata } from '../hooks/use-erc1155-metadata'
import { ERC1155Props } from '../utils/types'

interface ERC1155TokenUriNameProps extends ERC1155Props {
  tokenId: bigint
}

export function ERC1155TokenUriDescription({ address, chainId, className, tokenId, ...props }: ERC1155TokenUriNameProps) {
  const metadata = useERC1155Metadata({ address, chainId, tokenId })

  return (
    <span className={className} {...props}>
      {metadata.data?.description}
    </span>
  )
}
