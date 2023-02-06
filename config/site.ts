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
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = 'https://turboeth.xyz'

export const siteConfig: SiteConfig = {
  name: '⚡ TurboETH',
  title: 'TurboETH - Web3 App Template',
  emoji: '⚡',
  description: 'Web3 App Build System',
  previewImg: `${SITE_CANONICAL}/preview.png`,
  localeDefault: 'en',
  links: {
    twitter: 'https://twitter.com/KamesGeraghty',
    github: 'https://github.com/turbo-eth',
  },
}
