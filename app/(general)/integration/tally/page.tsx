"use client"

import {
  GovernorSortField,
  SortOrder,
} from "@/integrations/tally/autogen/schema"
import { useGovernorsQuery } from "@/integrations/tally/query/query-governor"

export default function Page() {
  const { isLoading, data } = useGovernorsQuery({
    pagination: { limit: 10 },
  })
  console.error(isLoading, data)
  return null
}
