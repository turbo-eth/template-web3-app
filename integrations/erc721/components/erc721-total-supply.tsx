import { useErc721TotalSupply } from "../generated/erc721-wagmi"
import { ERC721Props } from "../utils/types"

export function ERC721TotalSupply({
  address,
  chainId,
  className,
  ...props
}: ERC721Props) {
  const { data } = useErc721TotalSupply({
    address,
    chainId,
    watch: true,
  })

  return (
    <span className={className} {...props}>
      {data?.toString()}
    </span>
  )
}
