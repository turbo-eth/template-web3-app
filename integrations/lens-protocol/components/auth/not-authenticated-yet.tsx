import { ReactNode } from "react"
import { useActiveWallet } from "@lens-protocol/react-web"

export const NotAuthenticatedYet = ({ children }: { children: ReactNode }) => {
  const { data: wallet } = useActiveWallet()
  if (!wallet) return <>{children}</>
  return null
}
