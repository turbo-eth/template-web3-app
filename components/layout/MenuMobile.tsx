import * as React from 'react'

import classNames from 'classnames'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { useModal } from 'react-modal-hook'

import { SITE_EMOJI, SITE_NAME, SOCIAL_GITHUB, SOCIAL_TWITTER } from '@/lib/constants'

import { LinkComponent } from '../app/LinkComponent'
import ModalDynamic from '../modal/ModalDynamic'
interface MenuMobileProps {
  className?: string
  children: React.ReactNode
}

export const MenuMobile = ({ className, children }: MenuMobileProps) => {
  const [showModal, hideModal] = useModal(() => (
    <ModalDynamic hideModal={hideModal}>
      <div
        style={{ background: '#FFF' }}
        className="flex h-full max-h-full min-h-[620px] w-full min-w-[320px] max-w-full flex-col overflow-auto rounded-lg p-8 py-10">
        <div className="flex-1">
          <div className="flex-center flex flex-col">
            <div className="text-center">
              <LinkComponent href="/" className="flex w-full flex-1 items-center text-xl">
                <span className="mr-1">{SITE_EMOJI}</span>
                <h1 className="font-light">{SITE_NAME}</h1>
              </LinkComponent>
            </div>
          </div>
          <hr className="my-5" />
          <div className="flex flex-col gap-4">
            <LinkComponent href="/account" className="btn btn-green w-full">
              <span onClick={hideModal} className="">
                Account
              </span>
            </LinkComponent>
          </div>
        </div>
        <div className="">
          <a className=" my-2 text-xs" href="https://districtlabs.com/">
            Built by District Labs
          </a>
          <div className="mt-2 flex items-center">
            <LinkComponent href={`https://github.com/${SOCIAL_GITHUB}`}>
              <FaGithub />
            </LinkComponent>
            <div className="mx-2" />
            <LinkComponent href={`https://twitter.com/${SOCIAL_TWITTER}`}>
              <FaTwitter />
            </LinkComponent>
          </div>
        </div>
      </div>
    </ModalDynamic>
  ))

  const classes = classNames(className, 'MenuMobile', 'cursor-pointer')
  return (
    <span onClick={showModal} className={classes}>
      {children}
    </span>
  )
}

export default MenuMobile
