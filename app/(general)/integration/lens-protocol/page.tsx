'use client'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import { LensConfig, LensProvider, sources, development, appId, production } from '@lens-protocol/react-web'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'
import { LinkComponent } from '@/components/shared/link-component'
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { injectedWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { LoginButton } from '@/integrations/lens-protocol/components/LoginButton'
import { WhenLoggedInWithProfile } from '@/integrations/lens-protocol/components/WhenLoggedInWithProfile'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygonMumbai, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { LensSection } from '@/integrations/lens-protocol/components/LensSection'
const { publicClient, chains } = configureChains([polygonMumbai, polygon], [publicProvider()])
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      metaMaskWallet({ chains, shimDisconnect: true }),
      rainbowWallet({ chains }),
      // coinbaseWallet({ appName: APP_NAME, chains }),
      walletConnectWallet({ chains }),
    ],
  },
])
const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
})

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
}
export default function PageIntegration() {
  return (
    <LensProvider config={lensConfig}>
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
            {turboIntegrations.lens_protocol.name}
          </motion.h1>
          <motion.p className="my-4 text-lg" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.lens_protocol.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.lens_protocol.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>
      </div>
      <section className="container w-full  max-w-screen-lg lg:mt-5">
        <LoginButton />
        <WhenLoggedInWithProfile>{({ profile }) => <LensSection profile={profile} />}</WhenLoggedInWithProfile>{' '}
      </section>
    </LensProvider>
  )
}
