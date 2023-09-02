"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { turboIntegrations } from "@/data/turbo-integrations"
import { motion } from "framer-motion"
import { LuBook } from "react-icons/lu"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { PageSection } from "@/components/layout/page-section"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import { LinkComponent } from "@/components/shared/link-component"

const passportPath = turboIntegrations.gitcoinPassport.href
const stampGatedPath = turboIntegrations.gitcoinPassport.href + "/stamp-gated"
const scoreGatedPath = turboIntegrations.gitcoinPassport.href + "/score-gated"

export default function PageIntegration({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.gitcoinPassport.imgDark}
          DarkImage={turboIntegrations.gitcoinPassport.imgLight}
          alt="Gitcoin Passport Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>
          {turboIntegrations.gitcoinPassport.name}
        </PageHeaderHeading>
        <PageHeaderDescription>
          {turboIntegrations.gitcoinPassport.description}
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.gitcoinPassport.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection className="w-full">
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
            Stamp Gated Page
          </LinkComponent>
          <LinkComponent
            className={cn(
              "btn hover:opacity-75",
              pathname === scoreGatedPath && "opacity-50"
            )}
            href={scoreGatedPath}
          >
            Score Gated Page
          </LinkComponent>
        </motion.div>
      </PageSection>
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
