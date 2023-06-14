'use client'
import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ERC721Deploy, Erc721Read, Erc721WriteApprove, Erc721WriteMint, Erc721WriteTransfer } from '@/integrations/erc721'
import { Erc721SetTokenStorage } from '@/integrations/erc721/components/erc721-set-token-storage'
import { useErc721TokenStorage } from '@/integrations/erc721/hooks/use-erc721-token-storage'

export default function PageIntegration() {
  const [token] = useErc721TokenStorage()

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
            {turboIntegrations.erc721.name}
          </motion.h1>
          <motion.p className="my-4 text-lg" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.erc721.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.erc721.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      <section className="w-full lg:mt-10">
        <div className="container flex w-full flex-col items-center">
          <IsWalletConnected>
            <div className="flex w-full max-w-screen-lg flex-col gap-y-8">
              <ERC721Deploy />
              <Erc721SetTokenStorage />
              {token && (
                <>
                  <Erc721Read address={token} />
                  <Erc721WriteMint address={token} />
                  <Erc721WriteApprove address={token} />
                  <Erc721WriteTransfer address={token} />
                </>
              )}
            </div>
          </IsWalletConnected>
          <IsWalletDisconnected>
            <WalletConnect />
          </IsWalletDisconnected>
        </div>
      </section>
    </>
  )
}
