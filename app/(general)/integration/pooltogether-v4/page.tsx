import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LuBook } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { PoolTogetherFormDeposit } from "@/integrations/pooltogether-v4/components/form-yield-source-prize-pool-deposit"
import { PoolTogetherFormWithdraw } from "@/integrations/pooltogether-v4/components/form-yield-source-prize-pool-withdraw"

export default function PoolTogetherPage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.pooltogether_v4.imgDark}
          DarkImage={turboIntegrations.pooltogether_v4.imgLight}
          alt="PoolTogether Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>PoolTogether</PageHeaderHeading>
        <PageHeaderDescription>
          PoolTogether is a prize savings protocol, enable you to win by saving.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.pooltogether_v4.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection>
        <Tabs defaultValue="deposit" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="mt-4">
            <IsWalletConnected>
              <PoolTogetherFormDeposit />
            </IsWalletConnected>
            <IsWalletDisconnected>
              <div className="flex items-center justify-center">
                <WalletConnect />
              </div>
            </IsWalletDisconnected>
          </TabsContent>
          <TabsContent value="withdraw" className="mt-4">
            <IsWalletConnected>
              <PoolTogetherFormWithdraw />
            </IsWalletConnected>
            <IsWalletDisconnected>
              <div className="flex items-center justify-center">
                <WalletConnect />
              </div>
            </IsWalletDisconnected>
          </TabsContent>
        </Tabs>
      </PageSection>
    </div>
  )
}
