import React from 'react'

import classNames from 'clsx'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

import { siteConfig } from '@/config/site'

import { LinkComponent } from '../shared/link-component'

interface DashboardFooterProps {
  className?: string
}

export function DashboardFooter({ className }: DashboardFooterProps) {
  const classes = classNames(className, 'Footer', 'flex flex-col justify-center')

  return (
    <footer className={classes}>
      <h3 className="text-sm font-semibold">{siteConfig.title}</h3>
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
        <div className="mx-2" />
        <LinkComponent href={`${siteConfig.links.discord}`}>
          <FaDiscord />
        </LinkComponent>
      </div>
    </footer>
  )
}
