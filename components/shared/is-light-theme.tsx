"use client"

import { ReactNode } from "react"

import { useTheme } from "next-themes"

interface IsLightThemeProps {
  children: ReactNode
}

export const IsLightTheme = ({ children }: IsLightThemeProps) => {
  const { theme } = useTheme()

  if (theme === "light") return <>{children}</>

  return null
}
