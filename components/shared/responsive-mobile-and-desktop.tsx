import * as React from 'react'

import { useMediaQuery } from 'react-responsive'
interface ResponsiveMobileAndDesktopProps {
  children?: React.ReactElement | Array<React.ReactElement>
}

export const ResponsiveMobileAndDesktop = ({ children }: ResponsiveMobileAndDesktopProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  if (!children || (Array.isArray(children) && children.length != 2)) return <span>Invalid Component Branch</span>
  if (isTabletOrMobile && children && Array.isArray(children)) return children[0]
  if (!isTabletOrMobile && children && Array.isArray(children)) return children[1]
  return null
}
