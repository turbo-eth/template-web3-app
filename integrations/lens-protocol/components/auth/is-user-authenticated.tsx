import { ReactNode } from "react"
import { useActiveWallet } from "@lens-protocol/react-web"

import { Skeleton } from "@/components/ui/skeleton"

export const IsUserAuthenticated = ({
  children,
  showLoading,
}: {
  children: ReactNode
  showLoading?: boolean
}) => {
  const { data: wallet, loading } = useActiveWallet()
  if (loading && showLoading) return <Skeleton className="h-4 w-10" />
  if (wallet && children) return <>{children}</>
  return null
}
