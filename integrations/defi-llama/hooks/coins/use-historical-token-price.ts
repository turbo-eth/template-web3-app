import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useChainId } from "wagmi"

import {
  DEFAULT_CACHE_TIME,
  DEFAULT_SEARCH_WIDTH,
  DEFI_LLAMA_API_URL,
} from "../.."
import { formatCoinsInput } from "../../utils"
import type { CoinsInput, PriceResponse } from "../../utils/types"

interface QueryOptions
  extends Omit<
    UseQueryOptions<
      unknown,
      unknown,
      HistoricalPriceResponse,
      (string | number | CoinsInput | CoinsInput[])[]
    >,
    "initialData" | "queryKey"
  > {
  initialData?: (() => undefined) | undefined
}

export interface HistoricalPriceResponse {
  coins: {
    [key: string]: PriceResponse
  }
}

interface UseHistoricalTokenPriceProps extends QueryOptions {
  searchWidth?: string
  coins: CoinsInput[] | CoinsInput
  timestamp: number
}

/**
 * Fetches the historical price of a token from DeFi Llama
 * given a timestamp.
 */
export function useHistoricalTokenPrice({
  coins,
  searchWidth = DEFAULT_SEARCH_WIDTH,
  cacheTime = DEFAULT_CACHE_TIME,
  enabled,
  timestamp,
  ...options
}: UseHistoricalTokenPriceProps) {
  const formattedCoins = formatCoinsInput(
    Array.isArray(coins) ? coins : [coins]
  )

  const fetcher = async () => {
    if (!coins) return
    try {
      const url = new URL(
        `${DEFI_LLAMA_API_URL}/prices/historical/${timestamp}/${formattedCoins}`
      )
      const params = new URLSearchParams()

      if (searchWidth) {
        params.append("searchWidth", searchWidth.toString())
      }

      url.search = params.toString()
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch historical price")
      }
      const data: HistoricalPriceResponse = await response.json()

      return data
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
  }

  return useQuery(
    ["defi-llama", "historical-price", coins, searchWidth, timestamp],
    {
      queryFn: fetcher,
      enabled: !!coins && enabled,
      ...options,
    }
  )
}

interface UseHistoricalNativeTokenPriceProps
  extends Omit<UseHistoricalTokenPriceProps, "coins"> {
  chainId?: number
}

/**
 * Wrapper around `useHistoricalTokenPrice` that fetches the historical price of the
 * native token for the given chain. Defaults to the current chain.
 */
export function useHistoricalNativeTokenPrice(
  props: UseHistoricalNativeTokenPriceProps
) {
  const defaultChainId = useChainId()
  const chainId = props.chainId || defaultChainId

  const coinsInput = { type: "native", chainId } as const
  const queryResult = useHistoricalTokenPrice({
    coins: coinsInput,
    ...props,
  })

  const formattedData =
    queryResult.data?.coins?.[formatCoinsInput([coinsInput])]

  return { ...queryResult, data: formattedData }
}

interface UseHistoricalERC20TokenPriceProps extends QueryOptions {
  chainId?: number
  address: string
  timestamp: number
}

/**
 * Wrapper around `useHistoricalTokenPrice` that fetches the historical price of an
 * ERC20 token for the given chain. Defaults to the current chain.
 */
export function useHistoricalERC20TokenPrice(
  props: UseHistoricalERC20TokenPriceProps
) {
  const defaultChainId = useChainId()
  const chainId = props.chainId || defaultChainId

  const coinsInput = { type: "erc20", chainId, address: props.address } as const
  const queryResult = useHistoricalTokenPrice({
    coins: coinsInput,
    ...props,
  })

  const formattedData =
    queryResult.data?.coins?.[formatCoinsInput([coinsInput])]

  return { ...queryResult, data: formattedData }
}
