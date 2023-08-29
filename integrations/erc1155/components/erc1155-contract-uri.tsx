import { useErc1155ContractUri } from "../generated/erc1155-wagmi"
import { ERC1155Props } from "../utils/types"

export function ERC1155ContractUri({
  address,
  chainId,
  className,
  ...props
}: ERC1155Props) {
  const { data } = useErc1155ContractUri({
    address,
    chainId,
  })
  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}
