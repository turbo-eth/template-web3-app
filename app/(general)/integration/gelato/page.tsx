"use client"

import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { isAutomateSupported } from "@gelatonetwork/automate-sdk"
import { LuBook } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { LightDarkImage } from "@/components/light-dark-image"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { ActiveTasks, useIsAutomateSupported } from "@/integrations/gelato"

export default function GelatoPage() {
  const isAutomateSupported = useIsAutomateSupported()

  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.gelato.imgDark}
          DarkImage={turboIntegrations.gelato.imgLight}
          alt="Gelato Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Gelato</PageHeaderHeading>
        <PageHeaderDescription>
          Enabling developers to create augmented smart contracts that are
          automated, gasless & off-chain aware
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.gelato.url}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection>
        <IsWalletDisconnected>
          <WalletConnect className="mx-auto inline-block" />
        </IsWalletDisconnected>
        <IsWalletConnected>
          <div className="container flex w-full flex-col items-center">
            {isAutomateSupported ? (
              <>
                <div className="mb-10 flex w-full max-w-4xl">
                  <Link
                    className="btn btn-blue ml-auto !rounded-2xl"
                    href={"/integration/gelato/tasks/create"}
                  >
                    Create Task
                  </Link>
                </div>
                <ActiveTasks />
              </>
            ) : (
              <h3 className="text-2xl font-bold"> Network Not Supported</h3>
            )}
          </div>
        </IsWalletConnected>
      </PageSection>
    </div>
  )
}
