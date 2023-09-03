import { useErc721Name } from "../generated/erc721-wagmi"
import { ERC721Props } from "../utils/types"

export function ERC721Name({
  address,
  chainId,
  className,
  ...props
}: ERC721Props) {
  const { data } = useErc721Name({
    address,
    chainId,
  })
  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}
