import { useErc1155Name } from '../generated/erc1155-wagmi'
import { ERC1155Props } from '../utils/types'

export function Erc1155Name({ address, chainId, className, ...props }: ERC1155Props) {
  const { data } = useErc1155Name({
    address,
    chainId,
  })
  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}
