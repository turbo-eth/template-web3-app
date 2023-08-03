import { HTMLAttributes } from 'react'

import type { Address } from 'wagmi'

export interface ERC1155Props extends HTMLAttributes<HTMLElement> {
  address?: Address
  chainId?: number
}
