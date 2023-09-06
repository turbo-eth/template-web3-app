"use client"

import { useState } from "react"
import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LuBook } from "react-icons/lu"
import { Address } from "viem"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { PageSection } from "@/components/layout/page-section"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import { CreateSessionKey } from "@/integrations/session-keys/components/create-session-key"
import { DeleteAllSessionKeys } from "@/integrations/session-keys/components/delete-all-session-keys"
import { DeleteSessionKey } from "@/integrations/session-keys/components/delete-session-key"
import { ListSessionKeys } from "@/integrations/session-keys/components/list-session-keys"

export default function SessionKeysPage() {
  const [selectedSessionKey, setSelectedSessionKey] = useState<Address>()

  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.sessionKeys.imgDark}
          DarkImage={turboIntegrations.sessionKeys.imgLight}
          alt="Session Keys Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Session Keys</PageHeaderHeading>
        <PageHeaderDescription>
          Short-lived private keys enable transaction signing and the granting
          of temporary smart contract permissions.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.sessionKeys.url}
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
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <CreateSessionKey />
          <DeleteSessionKey
            selectedSessionKey={selectedSessionKey}
            setSelectedSessionKey={setSelectedSessionKey}
          />
          <DeleteAllSessionKeys />
        </div>
        <div className="mx-auto max-w-full">
          <ListSessionKeys
            selectedSessionKey={selectedSessionKey}
            setSelectedSessionKey={setSelectedSessionKey}
          />
        </div>
      </PageSection>
    </div>
  )
}
