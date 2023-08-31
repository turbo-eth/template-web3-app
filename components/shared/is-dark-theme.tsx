"use client"

import { ReactNode } from "react"

import { useTheme } from "next-themes"

interface IsDarkThemeProps {
  children: ReactNode
}

export const IsDarkTheme = ({ children }: IsDarkThemeProps) => {
  const { theme } = useTheme()

  if (theme !== "light") return <>{children}</>

  return null
}
