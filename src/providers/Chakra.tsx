import { ReactNode } from 'react'

import { ChakraProvider as ChakraUiProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

import { THEME_COLOR_SCHEME, THEME_CONFIG } from 'utils/config'

interface Props {
  children: ReactNode
}

const theme = extendTheme(withDefaultColorScheme({ colorScheme: THEME_COLOR_SCHEME }), {
  ...THEME_CONFIG,
})

export function ChakraProvider(props: Props) {
  return <ChakraUiProvider theme={theme}>{props.children}</ChakraUiProvider>
}
