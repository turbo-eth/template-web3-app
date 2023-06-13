import { ReactElement } from 'react'

import { useUser } from '@/lib/hooks/use-user'

interface BranchIsAuthenticatedProps {
  children?: ReactElement | Array<ReactElement>
}

export const BranchIsAuthenticated = ({ children }: BranchIsAuthenticatedProps) => {
  const { user } = useUser()

  if (!children) return null
  if (user?.isLoggedIn && children && !Array.isArray(children)) return children
  if (user?.isLoggedIn && Array.isArray(children)) return children[0]
  if (!user?.isLoggedIn && Array.isArray(children)) return children[1]

  return null
}
