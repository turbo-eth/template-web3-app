interface UserReserveData {
  underlyingAsset: `0x${string}`
  scaledATokenBalance: bigint
  usageAsCollateralEnabledOnUser: boolean
  stableBorrowRate: bigint
  scaledVariableDebt: bigint
  principalStableDebt: bigint
  stableBorrowLastUpdateTimestamp: bigint
}

interface ReserveData {
  underlyingAsset: string
  name: string
  symbol: string
  decimals: bigint
  baseLTVasCollateral: bigint
  reserveLiquidationThreshold: bigint
  reserveLiquidationBonus: bigint
  reserveFactor: bigint
  usageAsCollateralEnabled: boolean
  borrowingEnabled: boolean
  stableBorrowRateEnabled: boolean
  isActive: boolean
  isFrozen: boolean
  liquidityIndex: bigint
  variableBorrowIndex: bigint
  liquidityRate: bigint
  variableBorrowRate: bigint
  stableBorrowRate: bigint
  lastUpdateTimestamp: number
  aTokenAddress: string
  stableDebtTokenAddress: string
  variableDebtTokenAddress: string
  interestRateStrategyAddress: string
  availableLiquidity: bigint
  totalPrincipalStableDebt: bigint
  averageStableRate: bigint
  stableDebtLastUpdateTimestamp: bigint
  totalScaledVariableDebt: bigint
  priceInMarketReferenceCurrency: bigint
  priceOracle: string
  variableRateSlope1: bigint
  variableRateSlope2: bigint
  stableRateSlope1: bigint
  stableRateSlope2: bigint
  baseStableBorrowRate: bigint
  baseVariableBorrowRate: bigint
  optimalUsageRatio: bigint
  isPaused: boolean
  isSiloedBorrowing: boolean
  accruedToTreasury: bigint
  unbacked: bigint
  isolationModeTotalDebt: bigint
  flashLoanEnabled: boolean
  debtCeiling: bigint
  debtCeilingDecimals: bigint
  eModeCategoryId: number
  borrowCap: bigint
  supplyCap: bigint
  eModeLtv: number
  eModeLiquidationThreshold: number
  eModeLiquidationBonus: number
  eModePriceSource: string
  eModeLabel: string
  borrowableInIsolation: boolean
}

interface UsdData extends UserReserveData {
  reserveData: ReserveData
  tokenPriceInUsd: number
  amountInUsd: number
  debtInUsd: number
  supplyProportion: number
  borrowProportion: number
}

interface AaveState {
  userReservesData: UserReserveData[] | null
  healthFactor: number
  balanceInUsd: number
  collateralInUsd: number
  totalDebtInUsd: number
  maxBorrowableInUsd: number
  averageSupplyApy: number
  averageBorrowApy: number
  averageNetApy: number
  usdData: UsdData[] | null
  poolAddress: `0x${string}`
  chainSupported: boolean
}

export type { UserReserveData, ReserveData, UsdData, AaveState }
