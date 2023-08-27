"use client"

import { useState } from "react"
import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LuBook } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LightDarkImage } from "@/components/light-dark-image"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { FormConnextXTransfer } from "@/integrations/connext/components/form-connext-xtransfer"
import { LatestTransfers } from "@/integrations/connext/components/latest-transfers"

export default function ConnextPage() {
  const [isMainnet, setIsMainnet] = useState(false)

  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.connext.imgDark}
          DarkImage={turboIntegrations.connext.imgLight}
          alt="Connext Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Connext</PageHeaderHeading>
        <PageHeaderDescription>
          Bridge assets directly from your app
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.connext.url}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection>
        <div className="my-4 grid grid-cols-1 items-start gap-4 sm:my-0 lg:grid-cols-8 xl:my-4">
          <div className="hidden xl:col-span-2 xl:block"></div>
          <div className="3xl:mt-16 col-span-1 lg:col-span-5 xl:col-span-4">
            <FormConnextXTransfer
              isMainnet={isMainnet}
              setIsMainnet={setIsMainnet}
            />
          </div>
          <div className="3xl:mt-8 col-span-1 lg:col-span-3 xl:col-span-2">
            <LatestTransfers
              key={isMainnet ? "mainnet" : "testnet"}
              isMainnet={isMainnet}
            />
          </div>
        </div>
      </PageSection>
    </div>
  )
}
