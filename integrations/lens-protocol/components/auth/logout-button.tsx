import { useWalletLogout } from "@lens-protocol/react-web"

import { Button } from "@/components/ui/button"

export const LogoutButton = () => {
  const { execute: logout, isPending } = useWalletLogout()

  return (
    <Button
      variant="secondary"
      className="whitespace-nowrap"
      disabled={isPending}
      onClick={logout}
    >
      Log out
    </Button>
  )
}
