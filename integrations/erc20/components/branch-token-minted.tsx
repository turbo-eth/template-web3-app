import { ReactElement } from 'react'

import { useERC20TokenStorage } from '../hooks/use-erc20-token-storage'
interface BranchTokenMintedProps {
  children?: ReactElement | Array<ReactElement>
}

export function BranchTokenMinted({ children }: BranchTokenMintedProps) {
  const [token] = useERC20TokenStorage()

  if (!children) return null
  if (token && children && !Array.isArray(children)) return children
  if (token && Array.isArray(children)) return children[0]
  if (!token && Array.isArray(children)) return children[1]

  return null
}
