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
      CurrentTokenPriceResponse,
      (string | CoinsInput | CoinsInput[])[]
    >,
    "initialData" | "queryKey"
  > {
  initialData?: (() => undefined) | undefined
}

export interface CurrentTokenPriceResponse {
  coins: {
    [key: string]: PriceResponse
  }
}

interface UseCurrentTokenPriceProps extends QueryOptions {
  searchWidth?: string
  coins: CoinsInput[] | CoinsInput
}

/**
 * Fetches the current price of a token from DeFi Llama
 */
export function useCurrentTokenPrice({
  coins,
  searchWidth = DEFAULT_SEARCH_WIDTH,
  cacheTime = DEFAULT_CACHE_TIME,
  enabled,
  ...options
}: UseCurrentTokenPriceProps) {
  const formattedCoins = formatCoinsInput(
    Array.isArray(coins) ? coins : [coins]
  )

  const fetcher = async () => {
    if (!coins) return
    try {
      const url = new URL(
        `${DEFI_LLAMA_API_URL}/prices/current/${formattedCoins}`
      )
      const params = new URLSearchParams()

      if (searchWidth) {
        params.append("searchWidth", searchWidth.toString())
      }

      url.search = params.toString()
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch current price")
      }
      const data: CurrentTokenPriceResponse = await response.json()

      return data
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
  }

  return useQuery(["defi-llama", "current-price", coins, searchWidth], {
    queryFn: fetcher,
    enabled: !!coins && enabled,
    ...options,
  })
}

interface UseCurrentNativeTokenPriceProps
  extends Omit<UseCurrentTokenPriceProps, "coins"> {
  chainId?: number
}

/**
 * Wrapper around `useCurrentTokenPrice` that fetches the current price of the
 * native token for the given chain. Defaults to the current chain.
 */
export function useCurrentNativeTokenPrice(
  props: UseCurrentNativeTokenPriceProps = {}
) {
  const defaultChainId = useChainId()
  const chainId = props.chainId || defaultChainId

  const coinsInput = { type: "native", chainId } as const
  const queryResult = useCurrentTokenPrice({
    coins: coinsInput,
    ...props,
  })

  const formattedData =
    queryResult.data?.coins?.[formatCoinsInput([coinsInput])]

  return { ...queryResult, data: formattedData }
}

interface UseCurrentERC20TokenPriceProps
  extends Omit<UseCurrentTokenPriceProps, "coins"> {
  chainId?: number
  address: string
}

/**
 * Wrapper around `useCurrentTokenPrice` that fetches the current price of an
 * ERC20 token for the given chain. Defaults to the current chain.
 */
export function useCurrentERC20TokenPrice(
  props: UseCurrentERC20TokenPriceProps
) {
  const defaultChainId = useChainId()
  const chainId = props.chainId || defaultChainId

  const coinsInput = { type: "erc20", chainId, address: props.address } as const
  const queryResult = useCurrentTokenPrice({
    coins: coinsInput,
    ...props,
  })

  const formattedData =
    queryResult.data?.coins?.[formatCoinsInput([coinsInput])]

  return { ...queryResult, data: formattedData }
}
