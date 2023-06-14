'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'
import { IsSignedIn } from '@/integrations/siwe/components/is-signed-in'
import { IsSignedOut } from '@/integrations/siwe/components/is-signed-out'

export default function PageIntegration() {
  return (
    <div className="flex-center flex flex-1 flex-col items-center justify-center text-center">
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
        <IsLightTheme>
          <Image className="mx-auto" alt="Sign-In With Ethereum logo" src={turboIntegrations.siwe.imgDark} width={100} height={100} />
        </IsLightTheme>
        <IsDarkTheme>
          <Image className="mx-auto" alt="Sign-In With Ethereum logo" src={turboIntegrations.siwe.imgLight} width={100} height={100} />
        </IsDarkTheme>
        <motion.h1
          className="text-gradient-sand my-8 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}>
          {turboIntegrations.siwe.name}
        </motion.h1>
        <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <Balancer>{turboIntegrations.siwe.description}</Balancer>
        </motion.p>
        <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <LinkComponent isExternal href={turboIntegrations.siwe.url}>
            <button className="btn btn-primary">Documentation</button>
          </LinkComponent>
        </motion.div>
      </motion.div>

      <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-center">
        <IsWalletConnected>
          <IsSignedIn>
            <ButtonSIWELogout className="btn btn-blue btn-lg " />
          </IsSignedIn>
          <IsSignedOut>
            <ButtonSIWELogin className="btn btn-pill btn-emerald btn-lg min-h-[70px] min-w-[200px] text-xl" />
          </IsSignedOut>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect className="mx-auto inline-block" />
        </IsWalletDisconnected>
      </div>
    </div>
  )
}
