"use client"

import { HTMLAttributes } from "react"

import { useUser } from "@/lib/hooks/use-user"
import { siweLogout } from "@/integrations/siwe/actions/siwe-logout"

interface ButtonSIWELogoutProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
}

export const ButtonSIWELogout = ({
  className,
  label = "Logout",
  children,
  ...props
}: ButtonSIWELogoutProps) => {
  const { mutateUser } = useUser()
  const handleLogout = async () => {
    await siweLogout()
    await mutateUser()
  }

  return (
    <button
      className={className}
      onClick={() => void handleLogout()}
      {...props}
    >
      {children || label}
    </button>
  )
}
