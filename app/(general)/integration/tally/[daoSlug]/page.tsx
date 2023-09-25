"use client"

import { Governor } from "@/integrations/tally/components/governor"

export default function Page({
  params: { daoSlug },
}: {
  params: { daoSlug: string }
}) {
  return <Governor slug={decodeURIComponent(daoSlug)} />
}
