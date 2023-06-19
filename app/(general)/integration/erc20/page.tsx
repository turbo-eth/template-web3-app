'use client'
import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ERC20Deploy } from '@/integrations/erc20/components/erc20-deploy'
import { ERC20Read } from '@/integrations/erc20/components/erc20-read'
import { Erc20SetTokenStorage } from '@/integrations/erc20/components/erc20-set-token-storage'
import { ERC20WriteMint } from '@/integrations/erc20/components/erc20-write-mint'
import { ERC20WriteTransfer } from '@/integrations/erc20/components/erc20-write-transfer'
import { useERC20TokenStorage } from '@/integrations/erc20/hooks/use-erc20-token-storage'

export default function PageIntegration() {
  const [token] = useERC20TokenStorage()
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
            {turboIntegrations.erc20.name}
          </motion.h1>
          <motion.p className="my-4 text-lg" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.erc20.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.erc20.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      <section className="w-full lg:mt-10">
        <div className="container w-full max-w-screen-lg">
          <IsWalletConnected>
            <div className="flex w-full max-w-screen-lg flex-col gap-y-8">
              <ERC20Deploy />
              <Erc20SetTokenStorage />
              {token && (
                <>
                  <div className="card flex flex-col">
                    <span className="mb-4 text-lg">
                      Access the token page where you can update the url parameters to select which ERC20 token to view
                    </span>
                    <LinkComponent
                      className="btn btn-emerald btn-sm font-bold"
                      href={`/integration/erc20/1/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`}>
                      View Token Page
                    </LinkComponent>
                  </div>
                  <ERC20Read address={token} />
                  <ERC20WriteMint address={token} />
                  <ERC20WriteTransfer address={token} />
                </>
              )}
            </div>
          </IsWalletConnected>
          <IsWalletDisconnected>
            <div className="flex-center flex">
              <WalletConnect />
            </div>
          </IsWalletDisconnected>
        </div>
      </section>
    </>
  )
}
