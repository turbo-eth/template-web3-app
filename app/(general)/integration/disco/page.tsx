"use client"

import Link from "next/link"
import { turboIntegrations } from "@/data/documentation"
import { LuBook } from "react-icons/lu"
import { useAccount } from "wagmi"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { PageSection } from "@/components/layout/page-section"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { DiscoProfileBasic } from "@/integrations/disco/components/disco-profile-basic"
import { DiscoProfileCredentials } from "@/integrations/disco/components/disco-profile-credentials"
import { FormCredentialIssuanceProofOfHack } from "@/integrations/disco/components/form-issue-proof-of-hack"
import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

export default function DiscoPage() {
  const { address } = useAccount()

  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.disco.imgDark}
          DarkImage={turboIntegrations.disco.imgLight}
          alt="Disco Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Disco</PageHeaderHeading>
        <PageHeaderDescription>
          Disco is identity simplified. Giving the tools to consent to how
          information is shared and with whom.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.disco.url}
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
        <Tabs defaultValue="profile" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="proof-of-hack">Proof of Hack</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-6">
            <IsWalletConnected>
              <IsSignedIn>
                <section className="flex w-full flex-col gap-y-10">
                  <div className="container w-full rounded-lg bg-card p-6 shadow">
                    <h3 className="text-4xl font-bold">Disco Profile</h3>
                    <hr className="my-4" />
                    <DiscoProfileBasic address={address} />
                  </div>
                  <div className="card container max-w-full">
                    <h3 className="text-4xl font-bold">
                      Disco Verifiable Credentials
                    </h3>
                    <hr className="my-4" />
                    <DiscoProfileCredentials address={address} />
                  </div>
                </section>
              </IsSignedIn>
              <IsSignedOut>
                <div className="text-center">
                  <ButtonSIWELogin label="Sign-In With Ethereum" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Accessing the Disco API requires authenticating with an
                    Ethereum Account.
                  </p>
                </div>
              </IsSignedOut>
            </IsWalletConnected>
            <IsWalletDisconnected>
              <WalletConnect className="mx-auto inline-block" />
            </IsWalletDisconnected>
          </TabsContent>
          <TabsContent value="proof-of-hack" className="mt-6">
            <IsWalletConnected>
              <IsSignedIn>
                <FormCredentialIssuanceProofOfHack />
              </IsSignedIn>
              <IsSignedOut>
                <div className="text-center">
                  <ButtonSIWELogin label="Sign-In With Ethereum" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Accessing the Disco API requires authenticating with an
                    Ethereum Account.
                  </p>
                </div>
              </IsSignedOut>
            </IsWalletConnected>
            <IsWalletDisconnected>
              <WalletConnect className="mx-auto inline-block" />
            </IsWalletDisconnected>
          </TabsContent>
        </Tabs>
      </PageSection>
    </div>
  )
}
