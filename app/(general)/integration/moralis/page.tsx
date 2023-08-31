"use client"

import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { motion } from "framer-motion"
import { LuBook } from "react-icons/lu"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { PageSection } from "@/components/layout/page-section"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import {
  FormGetContractEvents,
  FormGetContractLogs,
} from "@/integrations/moralis/components/events"
import {
  FormGetInternalTransactions,
  FormGetTransaction,
  FormGetTransactionVerbose,
  FormGetWalletTransactions,
  FormGetWalletTransactionsVerbose,
} from "@/integrations/moralis/components/transaction"

export default function MoralisPage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.moralis.imgDark}
          DarkImage={turboIntegrations.moralis.imgLight}
          alt="Moralis Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Moralis</PageHeaderHeading>
        <PageHeaderDescription>
          Moralis provides a complete end-to-end blockchain application
          development platform.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.moralis.url}
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
        <Tabs defaultValue="transaction" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transaction">Transaction API</TabsTrigger>
            <TabsTrigger value="events">Events API</TabsTrigger>
          </TabsList>
          <TabsContent value="transaction">
            <motion.div
              animate="show"
              className="container mx-auto mt-10 flex w-full max-w-screen-lg flex-col gap-y-8"
              initial="hidden"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <FormGetTransaction />
              <FormGetTransactionVerbose />
              <FormGetInternalTransactions />
              <FormGetWalletTransactions />
              <FormGetWalletTransactionsVerbose />
            </motion.div>
          </TabsContent>
          <TabsContent value="events">
            <motion.div
              animate="show"
              className="container mx-auto mt-10 flex w-full max-w-screen-lg flex-col gap-y-8"
              initial="hidden"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <FormGetContractLogs />
              <FormGetContractEvents />
            </motion.div>
          </TabsContent>
        </Tabs>
      </PageSection>
    </div>
  )
}
