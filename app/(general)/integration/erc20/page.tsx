"use client"

import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
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
import { LinkComponent } from "@/components/shared/link-component"
import { ERC20Deploy } from "@/integrations/erc20/components/erc20-deploy"
import { ERC20Read } from "@/integrations/erc20/components/erc20-read"
import { Erc20SetTokenStorage } from "@/integrations/erc20/components/erc20-set-token-storage"
import { ERC20WriteMint } from "@/integrations/erc20/components/erc20-write-mint"
import { ERC20WriteTransfer } from "@/integrations/erc20/components/erc20-write-transfer"
import { useERC20TokenStorage } from "@/integrations/erc20/hooks/use-erc20-token-storage"

export default function Erc20Page() {
  const [token] = useERC20TokenStorage()

  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.erc20.imgDark}
          DarkImage={turboIntegrations.erc20.imgLight}
          alt="ERC20 Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>ERC20</PageHeaderHeading>
        <PageHeaderDescription>
          ERC20 is a standard for fungible tokens on EVM chains
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.erc20.url}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection>
        <div className="container w-full max-w-screen-lg">
          <IsWalletConnected>
            <div className="flex w-full max-w-screen-lg flex-col gap-y-8">
              <ERC20Deploy />
              <Erc20SetTokenStorage />
              {token && (
                <>
                  <div className="card flex flex-col">
                    <span className="mb-4 text-lg">
                      Access the token page where you can update the url
                      parameters to select which ERC20 token to view
                    </span>
                    <Link
                      className={cn(
                        buttonVariants({ variant: "emerald", size: "sm" })
                      )}
                      href={`/integration/erc20/1/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`}
                    >
                      View Token Page
                    </Link>
                  </div>
                  <ERC20Read address={token} />
                  <ERC20WriteMint address={token} />
                  <ERC20WriteTransfer address={token} />
                </>
              )}
            </div>
          </IsWalletConnected>
          <IsWalletDisconnected>
            <div className="flex items-center justify-center">
              <WalletConnect />
            </div>
          </IsWalletDisconnected>
        </div>
      </PageSection>
    </div>
  )
}
