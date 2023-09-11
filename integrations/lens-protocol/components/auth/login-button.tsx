import { useEffect } from "react"
import { useWalletLogin } from "@lens-protocol/react-web"
import { useAccount } from "wagmi"

import { useToast } from "@/lib/hooks/use-toast"
import { Button } from "@/components/ui/button"

export const LoginButton = () => {
  const { execute: login, error: loginError, isPending } = useWalletLogin()
  const { address } = useAccount()
  const { toast, dismiss } = useToast()

  useEffect(() => {
    if (loginError) showErrorToast(String(loginError))
  }, [loginError])

  const showErrorToast = (loginError: string) => {
    toast({
      title: "Login failed",
      description: loginError,
    })

    setTimeout(() => {
      dismiss()
    }, 10000)
  }

  const onLoginClick = async () => {
    if (!address) return null
    await login({
      address,
    })
  }
  return (
    <Button
      variant="emerald"
      className="whitespace-nowrap"
      disabled={!address || isPending}
      onClick={onLoginClick}
    >
      Log in
    </Button>
  )
}
