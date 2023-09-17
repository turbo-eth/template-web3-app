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
import {
  FormChart,
  FormCurrentPrice,
  FormHistoricalPrice,
  FormPercentageChange,
} from "@/integrations/defi-llama/components"

const integrationData = turboIntegrations.defiLlama

export default function IntegrationPage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={integrationData.imgDark}
          DarkImage={integrationData.imgLight}
          alt="TurboETH Logo"
          width={100}
          height={100}
          className="h-20 w-20 rounded-2xl"
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
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection>
        <div className="flex w-full max-w-screen-lg flex-col gap-y-10">
          <FormCurrentPrice />
          <FormChart />
          <FormHistoricalPrice />
          <FormPercentageChange />
        </div>
      </PageSection>
    </div>
  )
}
