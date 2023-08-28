import { useErc1155Symbol } from '../generated/erc1155-wagmi'
import { ERC1155Props } from '../utils/types'

export function Erc1155Symbol({ address, chainId, className, ...props }: ERC1155Props) {
  const { data } = useErc1155Symbol({
    address,
    chainId,
  })

  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}
