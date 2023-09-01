"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { turboIntegrations } from "@/data/turbo-integrations"
import { motion } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { cn } from "@/lib/utils"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsDarkTheme } from "@/components/shared/is-dark-theme"
import { IsLightTheme } from "@/components/shared/is-light-theme"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { LinkComponent } from "@/components/shared/link-component"

const passportPath = turboIntegrations.gitcoinPassport.href
const stampGatedPath = turboIntegrations.gitcoinPassport.href + "/stamp-gated"
const scoreGatedPath = turboIntegrations.gitcoinPassport.href + "/score-gated"

export default function PageIntegration({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
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
            alt="Gitcoin Passport logo"
            className="mx-auto"
            height={100}
            src={turboIntegrations.gitcoinPassport.imgDark}
            width={100}
          />
        </IsLightTheme>
        <IsDarkTheme>
          <Image
            alt="Gitcoin Passport logo"
            className="mx-auto"
            height={100}
            src={turboIntegrations.gitcoinPassport.imgLight}
            width={100}
          />
        </IsDarkTheme>
        <motion.h1
          className="text-gradient-sand my-8 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          {turboIntegrations.gitcoinPassport.name}
        </motion.h1>
        <motion.p
          className="my-4 text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>{turboIntegrations.gitcoinPassport.description}</Balancer>
        </motion.p>
        <motion.div
          className="my-4 text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <LinkComponent
            isExternal
            className="btn btn-primary"
            href={turboIntegrations.gitcoinPassport.url}
          >
            Documentation
          </LinkComponent>
        </motion.div>
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-x-14 gap-y-4 text-2xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <LinkComponent
            className={cn(
              "btn hover:opacity-75",
              pathname === passportPath && "opacity-50"
            )}
            href={passportPath}
          >
            Passport
          </LinkComponent>
          <LinkComponent
            className={cn(
              "btn hover:opacity-75",
              pathname === stampGatedPath && "opacity-50"
            )}
            href={stampGatedPath}
          >
            Stamp gated page
          </LinkComponent>
          <LinkComponent
            className={cn(
              "btn hover:opacity-75",
              pathname === scoreGatedPath && "opacity-50"
            )}
            href={scoreGatedPath}
          >
            Score gated page
          </LinkComponent>
        </motion.div>
      </motion.div>
      <motion.div
        animate="show"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 1,
            },
          },
        }}
      >
        <motion.div
          className="container mx-auto mt-10  max-w-screen-xl gap-6 text-center"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <IsWalletConnected>{children}</IsWalletConnected>
          <IsWalletDisconnected>
            <WalletConnect className="mx-auto inline-block" />
          </IsWalletDisconnected>
        </motion.div>
      </motion.div>
    </div>
  )
}
