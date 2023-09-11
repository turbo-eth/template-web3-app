"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LensProvider } from "@lens-protocol/react-web"
import { LuBook } from "react-icons/lu"

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
import { Navbar } from "@/integrations/lens-protocol/components/navbar"
import { lensProviderConfig } from "@/integrations/lens-protocol/lens-provider"

export default function LayoutIntegration({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.lensProtocol.imgDark}
          DarkImage={turboIntegrations.lensProtocol.imgLight}
          alt="Lens Protocol Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>
          {turboIntegrations.lensProtocol.name}
        </PageHeaderHeading>
        <PageHeaderDescription>
          {turboIntegrations.lensProtocol.description}
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.lensProtocol.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection className="w-full max-w-screen-xl">
        <IsWalletDisconnected>
          <WalletConnect className="mx-auto inline-block" />
        </IsWalletDisconnected>
        <IsWalletConnected>
          <LensProvider config={lensProviderConfig}>
            <div className="w-full rounded-xl pb-8 shadow-md dark:bg-neutral-900">
              <Navbar />
              <div className="container flex w-full flex-col items-center px-8">
                {children}
              </div>
            </div>
          </LensProvider>
        </IsWalletConnected>
      </PageSection>
    </>
  )
}
