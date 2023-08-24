import { useErc721OwnerOf } from "../generated/erc721-wagmi"
import { ERC721Props } from "../utils/types"

interface ERC721OwnerOfProps extends ERC721Props {
  tokenId: bigint
}

export function ERC721OwnerOf({
  address,
  chainId,
  className,
  tokenId,
  ...props
}: ERC721OwnerOfProps) {
  const { data } = useErc721OwnerOf({
    address,
    chainId,
    args: [tokenId],
    watch: true,
  })

  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}
