import React from 'react'

import { useUser } from '@/lib/hooks/app/use-user'

interface BranchIsAuthenticatedProps {
  children?: Array<React.ReactElement>
}

export const BranchIsAuthenticated = ({ children }: BranchIsAuthenticatedProps): React.ReactElement => {
  const { user } = useUser()

  if (!children || (Array.isArray(children) && children.length != 2)) return <span className="">BranchIsAuthenticated requires two children</span>
  if (!user?.isLoggedIn) return children[1]
  return children[0]
}
