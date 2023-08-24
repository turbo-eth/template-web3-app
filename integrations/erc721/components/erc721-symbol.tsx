import { useErc721Symbol } from "../generated/erc721-wagmi"
import { ERC721Props } from "../utils/types"

export function ERC721Symbol({
  address,
  chainId,
  className,
  ...props
}: ERC721Props) {
  const { data } = useErc721Symbol({
    address,
    chainId,
  })

  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}
