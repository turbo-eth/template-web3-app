import { arbitrum, goerli, mainnet, optimism, polygon, sepolia } from '@wagmi/chains'
export const SITE_CANONICAL = 'https://turbo.district.dev'
export const SITE_EMOJI = '⚡'
export const SITE_NAME = 'TurboETH'
export const SITE_TITLE = 'TurboETH - Web3 App Template'
export const SITE_DESCRIPTION = 'Web3 App Template built using Next.js, TailwindCSS and RainbowKit.'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'KamesGeraghty'
export const SOCIAL_GITHUB = 'turbo-eth/template-web3-app'

export const APP_CONFIG = {
  canonical: SITE_CANONICAL,
  emoji: SITE_EMOJI,
  title: SITE_TITLE,
  site_name: SITE_NAME,
  description: SITE_DESCRIPTION,
  previewImg: `${SITE_CANONICAL}/preview.png`,
  locale: 'en',
  twitter: SOCIAL_TWITTER,
}

// Override the default Goerli icon so it's not the same as the default Ethereum icon
// @ts-ignore
goerli.iconUrl = '/icons/NetworkEthereumTest.png'

export const ETH_CHAINS = [mainnet, polygon, optimism, arbitrum, goerli]

// export const DEPLOY_URL =
// 'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app&project-name=template-web3-app&repository-name=template-web3-app&demo-title=TurboETH&demo-description=An%20opinionated%20collection%20of%20components%2C%20hooks%2C%20and%20utilities%20for%20your%20Next%20project.&demo-url=https%3A%2F%2Fprecedent.vercel.app&demo-image=https%3A%2F%2Fprecedent.vercel.app%2Fapi%2Fog&env=DATABASE_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent%2Fblob%2Fmain%2F.env.example'
export const DEPLOY_URL =
  'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app&project-name=template-web3-app&repository-name=template-web3-app&demo-title=TurboETH'

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
}

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
}
