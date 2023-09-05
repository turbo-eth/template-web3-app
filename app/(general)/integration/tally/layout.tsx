"use client"

import React from "react"
import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LuBook } from "react-icons/lu"

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

interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.tally.imgDark}
          DarkImage={turboIntegrations.tally.imgLight}
          alt="Tally Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>{turboIntegrations.tally.name}</PageHeaderHeading>
        <PageHeaderDescription>
          Tally gives users real power in their decentralized organizations. On
          Tally, users can delegate voting power, create or pass proposals to
          spend DAO funds, manage a protocol, and upgrade smart contracts—all
          onchain. Onchain governance is important, no matter the chain. Tally
          supports DAOs on Ethereum, Polygon, Arbitrum, Optimism, Avalanche, BNB
          Chain, Gnosis, Base, Moonbeam, and Scroll.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.tally.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection className="w-full">{children}</PageSection>
    </div>
  )
}
