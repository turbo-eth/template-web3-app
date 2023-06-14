import { HTMLAttributes } from 'react'

import { FaGithub, FaTwitter } from 'react-icons/fa'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { LinkComponent } from '../shared/link-component'

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const classes = cn(className, 'px-4 py-6 flex flex-col justify-center items-center')

  return (
    <footer className={classes} {...props}>
      <h3>{siteConfig.title}</h3>
      <a className="link my-2 text-xs" target={'_blank'} href="https://districtlabs.com/" rel="noreferrer">
        Built by District Labs
      </a>
      <div className="mt-2 flex items-center">
        <LinkComponent href={`${siteConfig.links.github}`}>
          <FaGithub />
        </LinkComponent>
        <div className="mx-2" />
        <LinkComponent href={`${siteConfig.links.twitter}`}>
          <FaTwitter />
        </LinkComponent>
      </div>
    </footer>
  )
}
