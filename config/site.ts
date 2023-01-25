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

export const SITE_CANONICAL = 'https://turbo.district.dev'

export const siteConfig: SiteConfig = {
  name: 'TurboETH',
  title: 'TurboETH - Web3 App Template',
  emoji: '⚡',
  description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
  previewImg: `${SITE_CANONICAL}/preview.png`,
  localeDefault: 'en',
  links: {
    twitter: 'https://twitter.com/KamesGeraghty',
    github: 'https://github.com/turbo-eth',
  },
}
