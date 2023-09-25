"use client"

import { ProposalDetails } from "@/integrations/tally/components/proposal-details"

export default function Page({
  params: { daoSlug, proposal },
}: {
  params: { daoSlug: string; proposal: string }
}) {
  return (
    <ProposalDetails
      daoSlug={decodeURIComponent(daoSlug)}
      proposalId={decodeURIComponent(proposal)}
    />
  )
}
