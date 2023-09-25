import { createContext, useCallback, useEffect, useMemo, useState } from "react"

import {
  Chain,
  Governance,
  GovernanceSortField,
  SortOrder,
} from "./autogen/schema"
import { chainsQuery } from "./query/query-chains"
import { governorsQuery } from "./query/query-governors"

export interface ITallyContext {
  apiKey: string | null
  setApiKey: (apiKey: string | null) => void
  governors: { data: Governance[]; isLoading: boolean; error: string | null }
  chains: Chain[]
}

export const TallyContext = createContext<ITallyContext>({
  apiKey: null,
  setApiKey: (apiKey: string | null) => {},
  governors: { data: [], isLoading: true, error: null },
  chains: [],
})

export const TallyProvider = ({ children }: { children: React.ReactNode }) => {
  const [chains, setChains] = useState<Array<Chain>>([])
  const [governors, setGovernors] = useState<Array<Governance>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const pageSize = 250
  const getGovernorsPage = useCallback(
    async (page = 0) => {
      const response = await governorsQuery(
        {
          pagination: { limit: pageSize, offset: page * pageSize },
          sort: {
            field: GovernanceSortField.ActiveProposals,
            order: SortOrder.Desc,
          },
        },
        apiKey!
      )
      if (response.error) {
        if (page === 0) setError(response.error)
        setIsLoading(false)
        return
      }
      const { governances } = response.result
      setGovernors((govs) =>
        Array.from(new Set([...govs, ...(governances as Governance[])])).sort(
          (a, b) =>
            b.stats.proposals.active - a.stats.proposals.active ||
            b.stats.tokens.voters - a.stats.tokens.voters
        )
      )
      if (governances.length < pageSize) {
        // we done getting governors info
        setIsLoading(false)
      } else {
        await getGovernorsPage(page + 1)
      }
    },
    [apiKey]
  )

  const getChains = useCallback(async () => {
    const response = await chainsQuery(apiKey!)
    if (response.error) {
      console.error(response.error)
      setIsLoading(false)
      return
    }
    const { chains } = response.result
    setChains(chains)
  }, [apiKey])

  useEffect(() => {
    if (apiKey) {
      setGovernors([])
      setError(null)
      setIsLoading(true)
      void getChains()
      void getGovernorsPage()
    }
  }, [apiKey])

  const value: ITallyContext = useMemo(
    () => ({
      apiKey,
      setApiKey,
      chains,
      governors: { data: governors, isLoading, error },
    }),
    [apiKey, setApiKey, governors, isLoading, error]
  )
  return <TallyContext.Provider value={value}>{children}</TallyContext.Provider>
}
