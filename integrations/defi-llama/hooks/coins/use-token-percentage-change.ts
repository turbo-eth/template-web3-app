import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useChainId } from "wagmi"

import { DEFAULT_CACHE_TIME, DEFI_LLAMA_API_URL } from "../.."
import { formatCoinsInput } from "../../utils"
import type { CoinsInput, Period, PriceResponse } from "../../utils/types"

interface QueryOptions
  extends Omit<
    UseQueryOptions<
      unknown,
      unknown,
      TokenPercentageChangeResponse,
      (string | number | Period | boolean | CoinsInput | CoinsInput[])[]
    >,
    "initialData" | "queryKey"
  > {
  initialData?: (() => undefined) | undefined
}

export interface TokenPercentageChangeResponse {
  coins: {
    [key: string]: number
  }
}

interface UseTokenPercentageChangeProps extends QueryOptions {
  coins: CoinsInput[] | CoinsInput
  period?: Period
  lookForward?: boolean
  timestamp?: number
}

/**
 * Fetches the percentage change in price of a token from DeFi Llama
 * given a timestamp and period of time.
 */
export function useTokenPercentageChange({
  coins,
  period = "1d",
  lookForward = false,
  timestamp = Date.now() / 1000,
  cacheTime = DEFAULT_CACHE_TIME,
  enabled,
  ...options
}: UseTokenPercentageChangeProps) {
  const formattedCoins = formatCoinsInput(
    Array.isArray(coins) ? coins : [coins]
  )

  const fetcher = async () => {
    if (!coins) return
    try {
      const url = new URL(`${DEFI_LLAMA_API_URL}/percentage/${formattedCoins}`)
      const params = new URLSearchParams()
      params.append("period", period.toString())
      params.append("lookForward", lookForward.toString())
      params.append("timestamp", timestamp.toString())
      url.search = params.toString()

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch percentage price change")
      }
      const data: TokenPercentageChangeResponse = await response.json()

      return data
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
  }

  return useQuery(
    [
      "defi-llama",
      "percentage-change-price",
      coins,
      period,
      lookForward,
      timestamp,
    ],
    {
      queryFn: fetcher,
      enabled: !!coins && enabled,
      ...options,
    }
  )
}

interface UseNativeTokenPercentageChangeProps
  extends Omit<UseTokenPercentageChangeProps, "coins"> {
  chainId?: number
}

/**
 * Wrapper around `useTokenPercentageChange` that fetches the percentage change
 * in price of the native token for the given chain. Defaults to the current
 * chain.
 */
export function useNativeTokenPercentageChange(
  props: UseNativeTokenPercentageChangeProps = {}
) {
  const defaultChainId = useChainId()
  const chainId = props.chainId || defaultChainId

  const coinsInput = { type: "native", chainId } as const
  const queryResult = useTokenPercentageChange({ coins: coinsInput, ...props })

  const formattedData =
    queryResult.data?.coins?.[formatCoinsInput([coinsInput])]

  return { ...queryResult, data: formattedData }
}

interface UseERC20TokenPercentageChangeProps
  extends Omit<UseTokenPercentageChangeProps, "coins"> {
  chainId?: number
  address: string
}

/**
 * Wrapper around `useTokenPercentageChange` that fetches the percentage change
 * in price of an ERC20 token for the given chain. Defaults to the current
 * chain.
 */
export function useERC20TokenPercentageChange(
  props: UseERC20TokenPercentageChangeProps
) {
  const defaultChainId = useChainId()
  const chainId = props.chainId || defaultChainId

  const coinsInput = { type: "erc20", chainId, address: props.address } as const
  const queryResult = useTokenPercentageChange({ coins: coinsInput, ...props })

  const formattedData =
    queryResult.data?.coins?.[formatCoinsInput([coinsInput])]

  return { ...queryResult, data: formattedData }
}
