import { useERC20TokenStorage } from '../hooks/use-erc20-token-storage'

export function BranchTokenMinted({ children }: any) {
  const [token] = useERC20TokenStorage()
  return token !== undefined ? children[0] : children[1]
}
