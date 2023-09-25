"use client"

import { DaoDelegations } from "@/integrations/tally/components/dao-delegations"

export default function Page({
  params: { daoSlug },
}: {
  params: { daoSlug: string }
}) {
  return <DaoDelegations slug={decodeURIComponent(daoSlug)} />
}
