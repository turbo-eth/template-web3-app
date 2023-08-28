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

interface IntegrationLayoutProps {
  children: React.ReactNode
}

export default function IntegrationLayout({
  children,
}: IntegrationLayoutProps) {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.starter.imgDark}
          DarkImage={turboIntegrations.starter.imgLight}
          alt="TurboETH Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Starter Template</PageHeaderHeading>
        <PageHeaderDescription>
          Use this template to get started building integrations with TurboETH.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.starter.url}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection>{children}</PageSection>
    </div>
  )
}
