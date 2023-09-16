import { CoinsInput } from "./types"

export const chainIdToName: Record<number, string> = {
  1: "ethereum",
  10: "optimism",
  137: "matic-network",
  42161: "arbitrum",
}

export const nameToChainId: Record<string, number> = {
  ethereum: 1,
  optimism: 10,
  "matic-network": 137,
  arbitrum: 42161,
}

export function formatCoinsInput(coinsInputList: CoinsInput[]) {
  return coinsInputList
    .map((coinsInput) => {
      if (coinsInput.type === "native") {
        return `coingecko:${chainIdToName[coinsInput.chainId]}`
      }
      return `${chainIdToName[coinsInput.chainId]}:${coinsInput.address}`
    })
    .join(",")
}

/**
 * Calculates the period for the chart
 */
export const calculatePeriod = (
  timeInterval:
    | `${number}m`
    | `${number}h`
    | `${number}d`
    | `${number}y`
    | undefined,
  span: number
) => {
  if (!timeInterval) {
    return "0m" as const
  }

  // span = Number of data points
  let intervalMinutes: number
  if (timeInterval.includes("y")) {
    intervalMinutes = Number(timeInterval?.replace("y", "")) * 365 * 24 * 60
  } else if (timeInterval.includes("d")) {
    intervalMinutes = Number(timeInterval?.replace("d", "")) * 24 * 60
  } else if (timeInterval.includes("h")) {
    intervalMinutes = Number(timeInterval?.replace("h", "")) * 60
  } else if (timeInterval.includes("m")) {
    intervalMinutes = Number(timeInterval?.replace("m", ""))
  } else {
    intervalMinutes = Number(timeInterval)
  }

  // Number of days in the time interval
  const periodMinutes = Math.floor(intervalMinutes / (span - 1))

  return `${periodMinutes}m` as const
}
