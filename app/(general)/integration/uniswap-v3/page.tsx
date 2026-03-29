import Link from "next/link"
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
import { turboIntegrations } from "@/data/turbo-integrations"
import {
  DailySnapshotsTable,
  FeaturedTokenCard,
  ProtocolOverview,
  TokenLookup,
} from "@/integrations/uniswap-v3"
import { FEATURED_BASE_TOKENS } from "@/integrations/uniswap-v3/utils"

const integrationData = turboIntegrations.uniswapV3

export default function IntegrationPage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={integrationData.imgDark}
          DarkImage={integrationData.imgLight}
          alt="Uniswap V3"
          width={100}
          height={100}
          className="size-20 rounded-2xl"
        />
        <PageHeaderHeading>{integrationData.name}</PageHeaderHeading>
        <PageHeaderDescription>
          {integrationData.description}
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={integrationData.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 size-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection className="space-y-8">
        <ProtocolOverview />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FEATURED_BASE_TOKENS.map((token) => (
            <FeaturedTokenCard
              key={token.address}
              address={token.address}
              label={token.label}
            />
          ))}
        </div>
        <DailySnapshotsTable />
        <TokenLookup />
      </PageSection>
    </div>
  )
}
