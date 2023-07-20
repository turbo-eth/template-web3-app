// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  previewImg: string
  localeDefault: string
  links: {
    docs: string
    discord: string
    github: string
    twitter: string
  }
}

export const SITE_CANONICAL = 'https://turboeth.xyz'

export const siteConfig: SiteConfig = {
  name: 'TurboETH',
  title: 'TurboETH - Web3 App Template',
  emoji: '⚡',
  description: 'Web3 App Template built using Next.js, RainbowKit, SIWE, Disco, and more!',
  previewImg: `${SITE_CANONICAL}/preview.png`,
  localeDefault: 'en',
  links: {
    docs: 'https://docs.turboeth.xyz/overview',
    discord: 'https://discord.gg/U4jy7Xfh76',
    github: 'https://github.com/turbo-eth',
    twitter: 'https://twitter.com/district_labs',
  },
}
