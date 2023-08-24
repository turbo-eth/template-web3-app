"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { turboIntegrations } from "@/data/turbo-integrations"
import { motion } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsDarkTheme } from "@/components/shared/is-dark-theme"
import { IsLightTheme } from "@/components/shared/is-light-theme"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { LinkComponent } from "@/components/shared/link-component"
import { useIsAutomateSupported } from "@/integrations/gelato"

export default function LayoutIntegration({
  children,
}: {
  children: ReactNode
}) {
  const isAutomateSupported = useIsAutomateSupported()

  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center text-center">
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
          }}
        >
          <IsLightTheme>
            <Image
              alt="Gelato logo"
              className="mx-auto"
              height={100}
              src={turboIntegrations.gelato.imgDark}
              width={100}
            />
          </IsLightTheme>
          <IsDarkTheme>
            <Image
              alt="Gelato logo"
              className="mx-auto"
              height={100}
              src={turboIntegrations.gelato.imgLight}
              width={100}
            />
          </IsDarkTheme>
          <motion.h1
            className="text-gradient-sand mt-3 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Gelato
          </motion.h1>
          <motion.p
            className="my-4 text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>{turboIntegrations.gelato.description}</Balancer>
          </motion.p>
          <motion.div
            className="my-4 text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <LinkComponent isExternal href={turboIntegrations.gelato.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
        </motion.div>

        <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-center">
          <IsWalletDisconnected>
            <WalletConnect className="mx-auto inline-block" />
          </IsWalletDisconnected>
        </div>
      </div>
      <section className="w-full lg:mt-10">
        <IsWalletConnected>
          <div className="container flex w-full flex-col items-center">
            {isAutomateSupported ? (
              children
            ) : (
              <h3 className="text-2xl font-bold"> Network Not Supported</h3>
            )}
          </div>
        </IsWalletConnected>
      </section>
    </>
  )
}
