import { HTMLAttributes } from 'react'

export interface ERC721Props extends HTMLAttributes<HTMLElement> {
  address?: `0x${string}`
  chainId?: number
}
