import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LuBook } from "react-icons/lu"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LightDarkImage } from "@/components/light-dark-image"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { GeneralInfo } from "@/integrations/aave/components/general-info"
import { ListAssetsToBorrow } from "@/integrations/aave/components/list-assets-to-borrow"
import { ListAssetsToSupply } from "@/integrations/aave/components/list-assets-to-supply"
import { ListBorrowedAssets } from "@/integrations/aave/components/list-borrowed-assets"
import { ListSuppliedAssets } from "@/integrations/aave/components/list-supplied-assets"

export default function AavePage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.aave.imgDark}
          DarkImage={turboIntegrations.aave.imgLight}
          alt="Aave Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Aave</PageHeaderHeading>
        <PageHeaderDescription>
          Borrow and lend assets seamlessly
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={siteConfig.links.docs}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection className="w-full items-start">
        <GeneralInfo />
        <Tabs defaultValue="lend" className="w-full xl:hidden">
          <TabsList className="grid max-w-md grid-cols-2">
            <TabsTrigger value="lend">Lend</TabsTrigger>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
          </TabsList>
          <TabsContent value="lend" className="space-y-4">
            <ListSuppliedAssets />
            <ListAssetsToSupply />
          </TabsContent>
          <TabsContent value="borrow" className="space-y-4">
            <ListBorrowedAssets />
            <ListAssetsToBorrow />
          </TabsContent>
        </Tabs>
        <div className="hidden w-full gap-4 p-2 xl:flex">
          <div className="flex w-1/2 flex-col space-y-4">
            <ListSuppliedAssets />
            <ListAssetsToSupply />
          </div>
          <div className="flex w-1/2 flex-col space-y-4">
            <ListBorrowedAssets />
            <ListAssetsToBorrow />
          </div>
        </div>
      </PageSection>
    </div>
  )
}
