import React from 'react'

import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, useColorMode } from '@chakra-ui/react'

interface Props {
  className?: string
}

export function ThemeSwitcher(props: Props) {
  const className = props.className ?? ''
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box className={className} onClick={toggleColorMode} _hover={{ cursor: 'pointer' }}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Box>
  )
}
