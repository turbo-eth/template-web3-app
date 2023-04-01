import React from 'react'

import classNames from 'clsx'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { siteConfig } from '@/config/site'

import { LinkComponent } from '../shared/link-component'

interface Props {
  className?: string
}

export function DashboardFooter(props: Props) {
  const classes = classNames(props.className, 'Footer', 'flex flex-col justify-center')

  return (
    <footer className={classes}>
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
