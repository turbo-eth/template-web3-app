"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
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
import { FormLitDecryptMessage } from "@/integrations/lit-protocol/components/form-lit-decrypt-message"
import { FormLitEncryptMessage } from "@/integrations/lit-protocol/components/form-lit-encrypt-message"

export default function LitProtocolPage() {
  const searchParams = useSearchParams()
  const id = searchParams?.get("id") || ""

  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.litProtocol.imgDark}
          DarkImage={turboIntegrations.litProtocol.imgLight}
          alt="Lit Protocol Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Lit Protocol</PageHeaderHeading>
        <PageHeaderDescription>
          Lit is distributed key management for encryption, signing, and
          compute.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.litProtocol.url}
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
        <Tabs defaultValue="share" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="unseal">Unseal</TabsTrigger>
          </TabsList>
          <TabsContent value="share" className="mt-6">
            <IsWalletConnected>
              <FormLitEncryptMessage />
            </IsWalletConnected>
            <IsWalletDisconnected>
              <div className="flex items-center justify-center">
                <WalletConnect />
              </div>
            </IsWalletDisconnected>
          </TabsContent>
          <TabsContent value="unseal" className="mt-6">
            <IsWalletConnected>
              <FormLitDecryptMessage initialEencryptedMessageId={id} />
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
