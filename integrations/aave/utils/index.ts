import { zeroAddress } from "viem"

import { AaveState } from "./types"

export const limitDecimals = (input: string, decimalPlaces: number): string => {
  const parts = input.split(".")
  if (parts[1]) {
    parts[1] = parts[1].slice(0, decimalPlaces)
    return parts.join(".")
  } else {
    return input
  }
}

export const getDefaultUseAaveState = (): AaveState => ({
  healthFactor: 0,
  balanceInUsd: 0,
  collateralInUsd: 0,
  totalDebtInUsd: 0,
  maxBorrowableInUsd: 0,
  averageSupplyApy: 0,
  averageBorrowApy: 0,
  averageNetApy: 0,
  poolAddress: zeroAddress,
  chainSupported: false,
  userReservesData: null,
  usdData: null,
})
