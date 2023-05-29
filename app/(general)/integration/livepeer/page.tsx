'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { BranchColorMode } from '@/components/shared/branch-color-mode'
import { LinkComponent } from '@/components/shared/link-component'
import { Button } from '@/components/ui/button'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'

export default function LivepeerNav() {
  return (
    <div className="flex-center flex flex-1 flex-col items-center justify-center">
      <motion.div
        className="max-w-3xl px-5 text-center xl:px-0"
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
        <BranchColorMode>
          <Image className="mx-auto rounded-full" alt="Disco logo" src={turboIntegrations.livepeer.imgDark} width={100} height={100} />
          <Image className="mx-auto rounded-full" alt="Disco logo" src={turboIntegrations.livepeer.imgLight} width={100} height={100} />
        </BranchColorMode>
        <motion.h1
          className="text-gradient-sand my-8 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}>
          {turboIntegrations.livepeer.name}
        </motion.h1>
        <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <Balancer>{turboIntegrations.livepeer.description}</Balancer>
        </motion.p>
        <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <LinkComponent isExternal href={turboIntegrations.livepeer.url}>
            <button className="btn btn-primary">Documentation</button>
          </LinkComponent>
          <motion.div className="my-4">
            <motion.div>
              <LinkComponent href="/integration/livepeer/ondemand">
                <Button>Upload Video asset / View on demand</Button>
              </LinkComponent>
            </motion.div>
            <motion.div className="my-4">
              <LinkComponent href="/integration/livepeer/livestream">
                <Button>Create a livestream</Button>
              </LinkComponent>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
