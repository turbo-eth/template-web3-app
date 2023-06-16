'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { useAccount } from 'wagmi'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { DiscoProfileBasic } from '@/integrations/disco/components/disco-profile-basic'
import { DiscoProfileCredentials } from '@/integrations/disco/components/disco-profile-credentials'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { IsSignedIn } from '@/integrations/siwe/components/is-signed-in'
import { IsSignedOut } from '@/integrations/siwe/components/is-signed-out'

export default function PageIntegration() {
  const { address } = useAccount()
  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center">
        <motion.div
          animate="show"
          className="max-w-3xl px-5 text-center xl:px-0"
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
          <IsLightTheme>
            <Image alt="Disco logo" className="mx-auto rounded-full" height={100} src={turboIntegrations.disco.imgDark} width={100} />
          </IsLightTheme>
          <IsDarkTheme>
            <Image alt="Disco logo" className="mx-auto rounded-full" height={100} src={turboIntegrations.disco.imgLight} width={100} />
          </IsDarkTheme>
          <motion.h1
            className="text-gradient-sand my-8 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            {turboIntegrations.disco.name}
          </motion.h1>
          <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.disco.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.disco.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>

        <hr className="my-5" />
        <IsWalletConnected>
          <IsSignedIn>
            <div className="w-full">
              <section className="flex flex-col gap-y-10">
                <div className="card container max-w-screen-xl">
                  <h3 className="text-4xl font-bold">Disco Profile</h3>
                  <hr className="my-4" />
                  <DiscoProfileBasic address={address} />
                </div>
                <div className="card container max-w-screen-xl">
                  <h3 className="text-4xl font-bold">Disco Verifiable Credentials</h3>
                  <hr className="my-4" />
                  <DiscoProfileCredentials address={address} />
                </div>
              </section>
            </div>
          </IsSignedIn>
          <IsSignedOut>
            <div className="text-center">
              <ButtonSIWELogin className="btn btn-emerald" label="Sign-In With Ethereum" />
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-200">
                Accessing the Disco API requires authenticating with an Ethereum Account.
              </p>
            </div>
          </IsSignedOut>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect className="mx-auto inline-block" />
        </IsWalletDisconnected>
      </div>
    </>
  )
}
