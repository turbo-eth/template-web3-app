import { useEffect, useState } from 'react'

import { useAccount, useNetwork } from 'wagmi'

import { useUiPoolDataProviderGetReservesData, useUiPoolDataProviderGetUserReservesData } from '../generated/aave-wagmi'
import { MarketDataType, marketsData } from '../utils/market-config'

export const useAave = () => {
  const { address: user } = useAccount()
  const { chain } = useNetwork()
  const [market, setMarket] = useState<MarketDataType | null>(null)

  useEffect(() => {
    setMarket(marketsData?.find((market) => market.chainId === chain?.id) ?? null)
  }, [chain])

  const { data: userReservesData } = useUiPoolDataProviderGetUserReservesData({
    address: market?.addresses.UI_POOL_DATA_PROVIDER,
    args: market && user ? [market?.addresses.LENDING_POOL_ADDRESS_PROVIDER, user] : undefined,
  })

  const { data: reservesData } = useUiPoolDataProviderGetReservesData({
    address: market?.addresses.UI_POOL_DATA_PROVIDER,
    args: market ? [market?.addresses.LENDING_POOL_ADDRESS_PROVIDER] : undefined,
  })

  let balanceInUsd = 0
  let collateralInUsd = 0
  let totalDebtInUsd = 0

  const usdData = userReservesData?.map((userReserveData) => {
    const reserveData = reservesData?.[0].find((reserve) => reserve.underlyingAsset === userReserveData.underlyingAsset)
    const tokenPriceInUsd = Number(reserveData?.priceInMarketReferenceCurrency) / Number(reservesData?.[1].marketReferenceCurrencyPriceInUsd)
    const amountInUsd = (Number(userReserveData.scaledATokenBalance) / 10 ** Number(reserveData?.decimals)) * tokenPriceInUsd
    const debtInUsd = (Number(userReserveData.scaledVariableDebt) / 10 ** Number(reserveData?.decimals)) * tokenPriceInUsd

    balanceInUsd += amountInUsd
    totalDebtInUsd += debtInUsd

    if (reserveData?.usageAsCollateralEnabled) collateralInUsd += amountInUsd

    return {
      ...userReserveData,
      reserveData,
      tokenPriceInUsd,
      amountInUsd,
      debtInUsd,
    }
  })

  return { reservesData, userReservesData, usdData, balanceInUsd, totalDebtInUsd, collateralInUsd }
}
