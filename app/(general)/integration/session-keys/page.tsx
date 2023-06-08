'use client'
import { useState } from 'react'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import type { Address } from 'wagmi'

import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { CreateSessionKey } from '@/integrations/session-keys/components/create-session-key'
import { DeleteAllSessionKeys } from '@/integrations/session-keys/components/delete-all-session-keys'
import { DeleteSessionKey } from '@/integrations/session-keys/components/delete-session-key'
import { ListSessionKeys } from '@/integrations/session-keys/components/list-session-keys'

export default function PageIntegration() {
  const [selectedSessionKey, setSelectedSessionKey] = useState<Address>()

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
            {turboIntegrations.sessionKeys.name}
          </motion.h1>
          <motion.p className="my-4 text-lg" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.sessionKeys.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.sessionKeys.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      <section className="w-full lg:mt-20">
        <div className="mx-auto max-w-fit">
          <div className="mb-10 flex justify-between gap-4">
            <CreateSessionKey />
            <DeleteSessionKey setSelectedSessionKey={setSelectedSessionKey} selectedSessionKey={selectedSessionKey} />
            <DeleteAllSessionKeys />
          </div>
          <div className="mx-auto max-w-lg">
            <ListSessionKeys selectedSessionKey={selectedSessionKey} setSelectedSessionKey={setSelectedSessionKey} />
          </div>
        </div>
      </section>
    </>
  )
}
