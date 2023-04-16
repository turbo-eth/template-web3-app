'use client'
import classNames from 'clsx'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Balancer from 'react-wrap-balancer'

import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'

interface LayoutIntegrationProps {
  children: React.ReactNode
}

const sharePath = '/integration/lit-protocol/share'
const unsealPath = '/integration/lit-protocol/unseal'

export default function LayoutIntegration({ children }: LayoutIntegrationProps) {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center">
        <motion.div
          className="max-w-screen-xl px-5 text-center xl:px-0"
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}>
          <motion.h1
            className="text-gradient-sand my-4 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            {turboIntegrations.litProtocol.name}
          </motion.h1>
          <motion.p className="my-4 text-lg" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.litProtocol.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.litProtocol.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
          <motion.div className="mt-8 flex justify-center gap-14 text-2xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent href={sharePath}>
              <button className={classNames('btn hover:opacity-75', pathname === unsealPath && 'opacity-50')}>Share</button>
            </LinkComponent>
            <LinkComponent href={unsealPath}>
              <button className={classNames('btn hover:opacity-75', pathname === sharePath && 'opacity-50')}>Unseal</button>
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      {children}
    </>
  )
}
