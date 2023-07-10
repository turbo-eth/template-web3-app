'use client'
import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Balancer from 'react-wrap-balancer'

import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { useLivepeerApiKey } from '@/integrations/livepeer/hooks/use-livepeer-api-key'
import { LivepeerProvider } from '@/integrations/livepeer/livepeer-provider'
import { cn } from '@/lib/utils'

const livestreamPath = '/integration/livepeer/livestream'
const videoOnDemandPath = '/integration/livepeer/vod'

export default function LayoutIntegration({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [livepeerApiKey] = useLivepeerApiKey()

  return (
    <LivepeerProvider customApiKey={livepeerApiKey}>
      <motion.div
        animate="show"
        className="h-full w-full"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}>
        <div className="flex-center flex flex-1 flex-col items-center justify-center">
          <div className="max-w-screen-xl px-5 text-center xl:px-0">
            <motion.h1
              className="text-gradient-sand my-4 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              {turboIntegrations.livepeer.name}
            </motion.h1>
            <motion.p className="my-4 text-lg" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>{turboIntegrations.livepeer.description}</Balancer>
            </motion.p>
            <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <LinkComponent isExternal href={turboIntegrations.livepeer.url}>
                <button className="btn btn-primary">Documentation</button>
              </LinkComponent>
              <motion.div className="mt-8 flex flex-col justify-center gap-x-14 text-2xl sm:flex-row" variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <LinkComponent href={videoOnDemandPath}>
                  <button className={cn('btn hover:opacity-75', pathname === livestreamPath && 'opacity-50')}>Video on demand</button>
                </LinkComponent>
                <LinkComponent href={livestreamPath}>
                  <button className={cn('btn hover:opacity-75', pathname === videoOnDemandPath && 'opacity-50')}>Livestream</button>
                </LinkComponent>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div className="flex h-full w-full justify-center" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <div className="w-7/12">{children}</div>
        </motion.div>
      </motion.div>
    </LivepeerProvider>
  )
}
