import { useUser } from '@/lib/hooks/use-user'

interface BranchIsAuthenticatedProps {
  children?: React.ReactElement | Array<React.ReactElement>
}

// @ts-ignore
export const BranchIsAuthenticated = ({ children }: BranchIsAuthenticatedProps): React.ReactElement | null => {
  const { user } = useUser()

  if (!children) return <></>
  if (user?.isLoggedIn && children && !Array.isArray(children)) return children
  if (user?.isLoggedIn && Array.isArray(children)) return children[0]
  if (!user?.isLoggedIn && Array.isArray(children)) return children[1]
}
