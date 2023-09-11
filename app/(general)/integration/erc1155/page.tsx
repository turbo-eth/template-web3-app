"use client"

import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
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
import {
  Erc1155Deploy,
  Erc1155DeployTest,
  Erc1155Read,
  Erc1155WriteApprove,
  Erc1155WriteBatchTransfer,
  Erc1155WriteMint,
  Erc1155WriteTransfer,
} from "@/integrations/erc1155"
import { Erc1155SetTokenStorage } from "@/integrations/erc1155/components/erc1155-set-token-storage"
import { useErc1155TokenStorage } from "@/integrations/erc1155/hooks/use-erc1155-token-storage"

const integrationData = turboIntegrations.erc1155

export default function PageIntegration() {
  const [token] = useErc1155TokenStorage()

  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={integrationData.imgDark}
          DarkImage={integrationData.imgLight}
          alt={`${integrationData.name} Logo`}
          width={100}
          height={100}
        />
        <PageHeaderHeading>{integrationData.name}</PageHeaderHeading>
        <PageHeaderDescription>
          {integrationData.description}
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={integrationData.url}
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
          <div className="flex w-full max-w-screen-lg flex-col gap-y-8">
            <Erc1155Deploy />
            <Erc1155DeployTest />
            <Erc1155SetTokenStorage />
            {token && (
              <>
                <Erc1155Read address={token} />
                <Erc1155WriteMint address={token} />
                <Erc1155WriteApprove address={token} />
                <Erc1155WriteTransfer address={token} />
                <Erc1155WriteBatchTransfer address={token} />
              </>
            )}
          </div>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect />
        </IsWalletDisconnected>
      </PageSection>
    </div>
  )
}
