"use client"

import { DaoProposals } from "@/integrations/tally/components/dao-proposals"

export default function Page({
  params: { daoSlug },
}: {
  params: { daoSlug: string }
}) {
  return <DaoProposals slug={decodeURIComponent(daoSlug)} />
}
