'use client'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import {
  Erc1155Deploy,
  Erc1155DeployTest,
  Erc1155Read,
  Erc1155WriteApprove,
  Erc1155WriteBatchTransfer,
  Erc1155WriteMint,
  Erc1155WriteTransfer,
} from '@/integrations/erc1155'
import { Erc1155SetTokenStorage } from '@/integrations/erc1155/components/erc1155-set-token-storage'
import { useErc1155TokenStorage } from '@/integrations/erc1155/hooks/use-erc1155-token-storage'

export default function PageIntegration() {
  const [token] = useErc1155TokenStorage()

  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center">
        <motion.div
          animate="show"
          className="max-w-screen-xl px-5 text-center xl:px-0"
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
          <motion.h1
            className="text-gradient-sand my-4 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            {turboIntegrations.erc1155.name}
          </motion.h1>
          <motion.p className="my-4 text-lg" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.erc1155.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.erc1155.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      <section className="w-full lg:mt-10">
        <div className="container flex w-full flex-col items-center">
          <IsWalletConnected>
            <div className="flex w-full max-w-screen-lg flex-col gap-y-8">
              <Erc1155Deploy />
              <Erc1155DeployTest />
              <Erc1155SetTokenStorage />
              {token && (
                <>
                  <Erc1155Read address={token} />
                  <Erc1155WriteMint address={token} />
                  <Erc1155WriteApprove address={token} />
                  <Erc1155WriteTransfer address={token} />
                  <Erc1155WriteBatchTransfer address={token} />
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
