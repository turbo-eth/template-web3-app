"use client"

import React from "react"
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

import { SideBar } from "./sidebar"

interface ArweaveLayoutProps {
  children?: React.ReactNode
}

export default function ArweaveLayout({ children }: ArweaveLayoutProps) {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.arweave.imgDark}
          DarkImage={turboIntegrations.arweave.imgLight}
          alt="Arweave Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Arweave</PageHeaderHeading>
        <PageHeaderDescription>
          Arweave is the first protocol that enables permanent data storage. Its
          design allows anyone to preserve data forever with just a single,
          one-time fee.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.arweave.url}
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
