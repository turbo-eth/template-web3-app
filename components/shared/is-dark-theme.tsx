"use client"

import { ReactNode } from "react"
import { useTheme } from "next-themes"

interface IsDarkThemeProps {
  children: ReactNode
}

export const IsDarkTheme = ({ children }: IsDarkThemeProps) => {
  const { resolvedTheme } = useTheme()

  if (resolvedTheme === "dark") return <>{children}</>

  return null
}
