import { ThemingProps } from '@chakra-ui/react'
import { arbitrum, goerli, mainnet, optimism, polygon, sepolia } from '@wagmi/chains'

export const SITE_EMOJI = '⚡'
export const SITE_NAME = 'TurboETH'
export const SITE_TITLE = 'TurboETH - Web3 App Kit'
export const SITE_DESCRIPTION = 'Next.js + (Tailwind + Chakra) + (WAGMI + Rainbow Kit)'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'KamesGeraghty'
export const SOCIAL_GITHUB = 'turbo-eth/next-tailwind-web3-app'

export const ETH_CHAINS = [mainnet, goerli, polygon, optimism, arbitrum]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
