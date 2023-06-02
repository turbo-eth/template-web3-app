import { useErc721Name } from '../erc721-wagmi'
import { ERC721Props } from '../utils/types'

export function ERC721Name({ address, chainId, className }: ERC721Props) {
  const { data } = useErc721Name({
    address,
    chainId,
  })
  return <span className={className}>{data}</span>
}
