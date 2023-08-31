"use client"

import { useEffect, useState } from "react"
import { useAccount, useNetwork } from "wagmi"

import {
  useUiPoolDataProviderGetReservesData,
  useUiPoolDataProviderGetUserReservesData,
} from "../generated/aave-wagmi"
import { getDefaultUseAaveState } from "../utils"
import { MarketDataType, marketsData } from "../utils/market-config"
import {
  AaveState,
  ReserveData,
  UsdData,
  UserReserveData,
} from "../utils/types"

export const useAave = () => {
  const { address: user } = useAccount()
  const { chain } = useNetwork()
  const [market, setMarket] = useState<MarketDataType | null>(null)
  const [data, setData] = useState<AaveState>(getDefaultUseAaveState())

  const { data: reservesData } = useUiPoolDataProviderGetReservesData({
    address: market?.addresses.UI_POOL_DATA_PROVIDER,
    args: market
      ? [market?.addresses.LENDING_POOL_ADDRESS_PROVIDER]
      : undefined,
    watch: true,
  })

  const userReservesData = useUiPoolDataProviderGetUserReservesData({
    address: market?.addresses.UI_POOL_DATA_PROVIDER,
    args:
      market && user
        ? [market?.addresses.LENDING_POOL_ADDRESS_PROVIDER, user]
        : undefined,
    watch: true,
  }).data?.[0] as UserReserveData[]

  useEffect(() => {
    setMarket(
      marketsData?.find((market) => market.chainId === chain?.id) ?? null
    )
  }, [chain, userReservesData, reservesData])

  useEffect(() => {
    if (userReservesData) {
      let balanceInUsd = 0
      let collateralInUsd = 0
      let totalDebtInUsd = 0
      let maxBorrowableInUsd = 0

      const usdData = userReservesData.map((userReserveData) => {
        const reserveData = reservesData?.[0].find(
          (reserve) =>
            reserve.underlyingAsset === userReserveData.underlyingAsset
        ) as ReserveData

        const tokenPriceInUsd =
          Number(reserveData?.priceInMarketReferenceCurrency) /
          Number(reservesData?.[1].marketReferenceCurrencyPriceInUsd)
        const amountInUsd =
          (((Number(userReserveData.scaledATokenBalance) /
            10 ** Number(reserveData.decimals)) *
            Number(reserveData.liquidityIndex)) /
            10 ** 27) *
          tokenPriceInUsd
        const debtInUsd =
          (((Number(
            userReserveData.scaledVariableDebt ||
              userReserveData.principalStableDebt
          ) /
            10 ** 18) *
            Number(reserveData.variableBorrowIndex)) /
            10 ** 27) *
          tokenPriceInUsd

        balanceInUsd += amountInUsd
        totalDebtInUsd += debtInUsd

        if (userReserveData.usageAsCollateralEnabledOnUser) {
          collateralInUsd += amountInUsd
          maxBorrowableInUsd +=
            amountInUsd * (Number(reserveData.baseLTVasCollateral) / 10000)
        }

        return {
          ...userReserveData,
          reserveData,
          tokenPriceInUsd,
          amountInUsd,
          debtInUsd,
        }
      }) as UsdData[]

      const netWorth = balanceInUsd - totalDebtInUsd
      let averageLiquidationThreshold = 0
      let averageSupplyApy = 0
      let averageBorrowApy = 0

      usdData.forEach((data) => {
        data.supplyProportion = data.amountInUsd / balanceInUsd
        data.borrowProportion = data.debtInUsd / totalDebtInUsd
        averageLiquidationThreshold +=
          data.supplyProportion *
          (Number(data.reserveData.reserveLiquidationThreshold) / 10000)
        averageSupplyApy +=
          data.supplyProportion *
          (Number(data.reserveData.liquidityRate) / 10 ** 25)
        averageBorrowApy +=
          data.borrowProportion *
          (Number(data.reserveData.variableBorrowRate) / 10 ** 25)
      })

      const nativeTokenPrice =
        Number(reservesData?.[1].networkBaseTokenPriceInUsd) /
        Number(reservesData?.[1].marketReferenceCurrencyUnit)
      const collateralInNativeToken = collateralInUsd / nativeTokenPrice
      const debtInNativeToken = totalDebtInUsd / nativeTokenPrice
      setData({
        userReservesData,
        usdData,
        balanceInUsd,
        collateralInUsd,
        totalDebtInUsd,
        averageSupplyApy,
        averageBorrowApy,
        averageNetApy:
          totalDebtInUsd > 0
            ? (balanceInUsd * averageSupplyApy -
                totalDebtInUsd * averageBorrowApy) /
              netWorth
            : averageSupplyApy,
        maxBorrowableInUsd: maxBorrowableInUsd - totalDebtInUsd,
        healthFactor:
          (collateralInNativeToken * averageLiquidationThreshold) /
          debtInNativeToken,
        poolAddress: (market?.addresses.LENDING_POOL ?? "") as `0x${string}`,
        chainSupported: true,
      })
    } else {
      setData({ ...data, chainSupported: false })
    }
  }, [userReservesData, market, user, chain])

  return data
}
