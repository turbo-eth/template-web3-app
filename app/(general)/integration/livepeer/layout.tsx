"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LuBook } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { PageSection } from "@/components/layout/page-section"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import { LinkComponent } from "@/components/shared/link-component"
import { useLivepeerApiKey } from "@/integrations/livepeer/hooks/use-livepeer-api-key"
import { LivepeerProvider } from "@/integrations/livepeer/livepeer-provider"

const livestreamPath = "/integration/livepeer/livestream"
const videoOnDemandPath = "/integration/livepeer/vod"

export default function LayoutIntegration({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const [livepeerApiKey] = useLivepeerApiKey()

  return (
    <LivepeerProvider customApiKey={livepeerApiKey}>
      <div className="container relative mt-20">
        <PageHeader className="pb-8">
          <LightDarkImage
            LightImage={turboIntegrations.livepeer.imgDark}
            DarkImage={turboIntegrations.livepeer.imgLight}
            alt="Livepeer Logo"
            width={100}
            height={100}
          />
          <PageHeaderHeading>Livepeer</PageHeaderHeading>
          <PageHeaderDescription>
            Livepeer is the world&apos;s open video infrastructure.
          </PageHeaderDescription>
          <PageHeaderCTA>
            <Link
              href={turboIntegrations.livepeer.url}
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
          <div className="mb-4 mt-8 flex flex-col items-center justify-center gap-x-14 gap-y-4 text-2xl sm:flex-row">
            <LinkComponent href={videoOnDemandPath}>
              <Button
                className={cn(pathname === videoOnDemandPath && "opacity-50")}
              >
                Video on demand
              </Button>
            </LinkComponent>
            <LinkComponent href={livestreamPath}>
              <Button
                className={cn(pathname === livestreamPath && "opacity-50")}
              >
                Livestream
              </Button>
            </LinkComponent>
          </div>
          {children}
        </PageSection>
      </div>
    </LivepeerProvider>
  )
}
