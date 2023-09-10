import { createContext, useCallback, useEffect, useMemo, useState } from "react"

import {
  Governor,
  GovernorSortField,
  InputMaybe,
  SortOrder,
} from "../autogen/schema"
import { governorsQuery } from "../query/query-governor"

export interface ITallyGovernorsContext {
  governors: Array<Governor>
  isLoading: boolean
  hasMore: boolean
  next: () => Promise<void>
}

export const TallyGovernorsContext = createContext<ITallyGovernorsContext>({
  governors: [],
  isLoading: false,
  hasMore: true,
  next: async () => Promise.resolve(),
})

export const TallyGovernorsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [governors, setGovernors] = useState<Array<Governor>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [lastPage, setLastPage] = useState<number | null>(null)

  const fetchGovernorsPage = async (page: number) => {
    // early return if we're already getting a page
    if (isLoading) return
    setIsLoading(true)
    const pageSize = 250
    const govs = await governorsQuery({
      pagination: { limit: pageSize, offset: page * pageSize },
      sort: {
        // @ts-ignore
        field: GovernorSortField.ActiveProposals,
        order: SortOrder.Desc,
      },
    })
    if (govs.result) {
      const result: Array<Governor> = govs.result.governors
      if (result.length < pageSize) {
        // we have fetched all the governors
        setHasMore(false)
      } else {
        // tally graphql sometimes returns duplicated items.
        setGovernors((prev) => Array.from(new Set([...prev, ...result])))
        setLastPage(page)
      }
    } else {
      console.error(JSON.stringify(govs))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (governors.length === 0) {
      void fetchGovernorsPage(0)
    }
  }, [governors])

  const getNextPage = useCallback(async () => {
    await fetchGovernorsPage((lastPage ?? 0) + 1)
  }, [lastPage])

  const value: ITallyGovernorsContext = useMemo(
    () => ({
      governors,
      isLoading,
      hasMore,
      next: getNextPage,
    }),
    [governors, isLoading, hasMore]
  )
  return (
    <TallyGovernorsContext.Provider value={value}>
      {children}
    </TallyGovernorsContext.Provider>
  )
}
