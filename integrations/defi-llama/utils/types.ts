/**
 * Period representation of DefiLlama API
 * "w" = "week"
 * "d" = "day"
 * "h" = "hour"
 * "m" = "minute"
 * @example "1w" | "1d" | "1h" | "1m"
 */
export type Period = `${number}${"w" | "d" | "h" | "m"}`

export type CoinsInput =
  | {
      chainId: number
      type: "native"
    }
  | {
      chainId: number
      type: "erc20"
      address: string
    }

export type PriceResponse = {
  price: number
  symbol: string
  timestamp: number
  decimals?: number
  confidence: number
}
