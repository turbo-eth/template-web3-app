import { useErc721TotalSupply } from '../erc721-wagmi'
import { ERC721Props } from '../utils/types'

export function ERC721TotalSupply({ address, chainId, className, ...props }: ERC721Props) {
  const { data } = useErc721TotalSupply({
    address,
    chainId,
  })

  return (
    <span className={className} {...props}>
      {data?.toString()}
    </span>
  )
}
