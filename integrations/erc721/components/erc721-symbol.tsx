import { useErc721Symbol } from '../erc721-wagmi'
import { ERC721Props } from '../utils/types'

export function ERC721Symbol({ address, chainId, className }: ERC721Props) {
  const { data } = useErc721Symbol({
    address,
    chainId,
  })

  return <span className={className}>{data}</span>
}
