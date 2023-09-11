"use client"

import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LuBook } from "react-icons/lu"
import { useNetwork } from "wagmi"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import TransactionsTable from "@/integrations/etherscan/components/transactions-table"
import { useEtherscanAccountTransactions } from "@/integrations/etherscan/hooks/use-etherscan-account-transactions"
import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export default function EtherscanPage() {
  const { chain } = useNetwork()
  const { isLoading, data } = useEtherscanAccountTransactions({
    chainId: chain?.id || 1,
  })

  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.etherscan.imgDark}
          DarkImage={turboIntegrations.etherscan.imgLight}
          alt="Etherscan Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Etherscan</PageHeaderHeading>
        <PageHeaderDescription>
          Etherscan is the leading block explorer and search, API & analytics
          platform for Ethereum.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.etherscan.url}
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
        <IsWalletConnected>
          <IsSignedIn>
            <div className="w-full">
              {!isLoading && (
                <Card>
                  <CardContent>
                    <TransactionsTable
                      className="w-full"
                      data={data?.transactions}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </IsSignedIn>
          <IsSignedOut>
            <div className="flex flex-col items-center">
              <ButtonSIWELogin label="Sign-In With Ethereum" />
              <p className="mt-4 text-sm text-muted-foreground">
                Accessing the Etherscan API requires authenticating with an
                Ethereum Account.
              </p>
            </div>
          </IsSignedOut>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect className="mx-auto inline-block" />
        </IsWalletDisconnected>
      </PageSection>
    </div>
  )
}
