import { useErc1155AccountsByToken } from "../generated/erc1155-wagmi"
import { ERC1155Props } from "../utils/types"

interface ERC1155OwnerOfProps extends ERC1155Props {
  tokenId: bigint
}

export function Erc1155OwnerOf({
  address,
  chainId,
  className,
  tokenId,
  ...props
}: ERC1155OwnerOfProps) {
  const { data } = useErc1155AccountsByToken({
    address,
    chainId,
    args: [tokenId],
    watch: true,
  })

  return (
    <span className={className} {...props}>
      {data && JSON.stringify(data)}
    </span>
  )
}
