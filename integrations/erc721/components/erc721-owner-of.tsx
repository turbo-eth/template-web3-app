import { BigNumber } from 'ethers'

import { useErc721OwnerOf } from '../erc721-wagmi'
import { ERC721Props } from '../utils/types'

interface ERC721OwnerOfProps extends ERC721Props {
  tokenId: number
}

export function ERC721OwnerOf({ address, chainId, className, tokenId, ...props }: ERC721OwnerOfProps) {
  const { data } = useErc721OwnerOf({
    address,
    chainId,
    args: [BigNumber.from(tokenId)],
  })

  return (
    <span className={className} {...props}>
      {data}
    </span>
  )
}
