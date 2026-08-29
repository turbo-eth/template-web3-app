"use client"

import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LuBook, LuRepeat, LuShieldCheck, LuZap } from "react-icons/lu"

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
import { DelegatableSubscriptionCronStatus } from "@/integrations/delegatable-subscription/components/delegatable-subscription-cron-status"
import { DelegatableSubscriptionList } from "@/integrations/delegatable-subscription/components/delegatable-subscription-list"
import { FormDelegatableSubscriptionRevoke } from "@/integrations/delegatable-subscription/components/form-delegatable-subscription-revoke"
import { FormDelegatableSubscriptionStart } from "@/integrations/delegatable-subscription/components/form-delegatable-subscription-start"

export default function DelegatableSubscriptionPage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.delegatableSubscription.imgDark}
          DarkImage={turboIntegrations.delegatableSubscription.imgLight}
          alt="Delegatable Logo"
          width={100}
          height={100}
          className="h-20 w-20 rounded-2xl"
        />
        <PageHeaderHeading>Delegatable Subscriptions</PageHeaderHeading>
        <PageHeaderDescription>
          Gas-less recurring token payments and conditional delegations powered
          by the Delegatable smart contract framework and
          DistrictERC20PermitSubscriptionsEnforcer.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.delegatableSubscription.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
          <Link
            href="https://github.com/district-labs/delegatable-enforcers"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuShieldCheck className="mr-2 h-4 w-4" />
            Enforcers Repo
          </Link>
        </PageHeaderCTA>
      </PageHeader>

      <PageSection>
        <Tabs defaultValue="start" className="w-full max-w-4xl space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="start" className="flex items-center gap-2">
              <LuZap className="h-4 w-4" />
              <span className="hidden sm:inline">Start</span> Subscription
            </TabsTrigger>
            <TabsTrigger value="queue" className="flex items-center gap-2">
              <LuRepeat className="h-4 w-4" />
              <span className="hidden sm:inline">Execution</span> Queue
            </TabsTrigger>
            <TabsTrigger value="revoke" className="flex items-center gap-2">
              <LuShieldCheck className="h-4 w-4" />
              Revoke
            </TabsTrigger>
            <TabsTrigger value="cron" className="flex items-center gap-2">
              <LuRepeat className="h-4 w-4" />
              Cron Relayer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="start" className="space-y-4">
            <FormDelegatableSubscriptionStart />
          </TabsContent>

          <TabsContent value="queue" className="space-y-4">
            <DelegatableSubscriptionList />
          </TabsContent>

          <TabsContent value="revoke" className="space-y-4">
            <FormDelegatableSubscriptionRevoke />
          </TabsContent>

          <TabsContent value="cron" className="space-y-4">
            <DelegatableSubscriptionCronStatus />
          </TabsContent>
        </Tabs>
      </PageSection>
    </div>
  )
}
