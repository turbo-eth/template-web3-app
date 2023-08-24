"use client"

import { ReactNode } from "react"
import { useMediaQuery } from "react-responsive"

interface IsMobileProps {
  children: ReactNode
}

export const IsMobile = ({ children }: IsMobileProps) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  if (isTabletOrMobile) return <>{children}</>

  return null
}
