"use client"

import { ReactNode } from "react"
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

export default function PageIntegration({ children }: { children: ReactNode }) {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.gitcoinPassport.imgDark}
          DarkImage={turboIntegrations.gitcoinPassport.imgLight}
          alt="Gitcoin Passport Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>
          {turboIntegrations.gitcoinPassport.name}
        </PageHeaderHeading>
        <PageHeaderDescription>
          {turboIntegrations.gitcoinPassport.description}
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.gitcoinPassport.url}
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
        <section className="flex w-full flex-col overflow-hidden rounded-xl bg-muted shadow-sm sm:flex-row">
          <SideBar />
          <div className="min-h-[600px] flex-1 flex-col p-2 sm:p-4 md:p-10">
            {children}
          </div>
        </section>
      </PageSection>
    </div>
  )
}
