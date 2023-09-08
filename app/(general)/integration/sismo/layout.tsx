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

import { SideBar } from "./sidebar"

interface SismoLayoutProps {
  children?: React.ReactNode
}

export default function SismoLayout({ children }: SismoLayoutProps) {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.sismo.imgLight}
          DarkImage={turboIntegrations.sismo.imgDark}
          alt="Sismo Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Sismo</PageHeaderHeading>
        <PageHeaderDescription>
          Sismo ETH is a decentralized identity aggregator and crypto-native SSO
          that uses zero-knowledge proofs (ZKPs) to enable users to aggregate
          and selectively disclose personal data to applications.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.sismo.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection className="w-full">
        <section className="flex w-full flex-col overflow-hidden rounded-xl bg-muted sm:flex-row">
          <SideBar />
          <div className="min-h-[600px] flex-1 flex-col items-center justify-center p-10 text-center">
            {children}
          </div>
        </section>
      </PageSection>
    </div>
  )
}
