import { HTMLAttributes } from "react"
import type { Address } from "wagmi"

export interface SafeProps extends HTMLAttributes<HTMLElement> {
  address?: Address
  chainId?: number
}
