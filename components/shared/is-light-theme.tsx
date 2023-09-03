"use client"

import { ReactNode } from "react"
import { useTheme } from "next-themes"

interface IsLightThemeProps {
  children: ReactNode
}

export const IsLightTheme = ({ children }: IsLightThemeProps) => {
  const { resolvedTheme } = useTheme()

  if (resolvedTheme === "light") return <>{children}</>

  return null
}
