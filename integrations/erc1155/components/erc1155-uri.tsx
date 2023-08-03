import { useErc1155Uri } from '../generated/erc1155-wagmi'
import { ERC1155Props } from '../utils/types'

export function ERC1155Uri({ address, chainId, className, ...props }: ERC1155Props) {
  const { data } = useErc1155Uri({
    address,
    chainId,
    args: [BigInt(1)]
  })
  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}
