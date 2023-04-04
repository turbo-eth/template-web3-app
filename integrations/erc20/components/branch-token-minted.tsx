import { useTokenStorage } from '../hooks/use-token-storage'

export function BranchTokenMinted({ children }: any) {
  const [token] = useTokenStorage()
  return token !== undefined ? children[0] : children[1]
}
