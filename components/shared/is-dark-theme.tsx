"use client"

import { ReactNode } from "react"

import { useColorMode } from "@/lib/state/color-mode"

interface IsDarkThemeProps {
  children: ReactNode
}

export const IsDarkTheme = ({ children }: IsDarkThemeProps) => {
  const [colorMode] = useColorMode()

  if (colorMode !== "light") return <>{children}</>

  return null
}
