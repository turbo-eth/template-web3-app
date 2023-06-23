import React from 'react'

import classNames from 'clsx'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

import { siteConfig } from '@/config/site'

import { LinkComponent } from '../shared/link-component'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const classes = classNames(props.className, 'Footer', 'px-4 py-6 flex flex-col justify-center items-center')

  return (
    <footer className={classes}>
      <h3>{siteConfig.title}</h3>
      <a className="link my-2 text-xs" target={'_blank'} href="https://districtlabs.com/" rel="noreferrer">
        Built by District Labs
      </a>
      <div className="mt-2 flex items-center space-x-2">
        <LinkComponent href={`${siteConfig.links.github}`}>
          <FaGithub />
        </LinkComponent>
        <LinkComponent href={`${siteConfig.links.twitter}`}>
          <FaTwitter />
        </LinkComponent>
        <LinkComponent href={`${siteConfig.links.discord}`}>
          <FaDiscord />
        </LinkComponent>
      </div>
    </footer>
  )
}
