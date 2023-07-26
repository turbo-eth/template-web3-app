import { useEffect, useState } from 'react'

import { useAccount, useNetwork } from 'wagmi'

import { useUiPoolDataProviderGetReservesData, useUiPoolDataProviderGetUserReservesData } from '../generated/aave-wagmi'
import { MarketDataType, marketsData } from '../utils/market-config'

export const useAave = () => {
  const { address: user } = useAccount()
  const { chain } = useNetwork()
  const [market, setMarket] = useState<MarketDataType | null>(null)
  const [userReservesData, setUserReservesData] = useState<UserReserveData[] | null>(null)
  const [balanceInUsd, setBalanceInUsd] = useState(0)
  const [collateralInUsd, setCollateralInUsd] = useState(0)
  const [totalDebtInUsd, setTotalDebtInUsd] = useState(0)
  const [usdData, setUsdData] = useState<UsdData[] | null>(null)

  const { data: reservesData } = useUiPoolDataProviderGetReservesData({
    address: market?.addresses.UI_POOL_DATA_PROVIDER,
    args: market ? [market?.addresses.LENDING_POOL_ADDRESS_PROVIDER] : undefined,
  })

  const data = useUiPoolDataProviderGetUserReservesData({
    address: market?.addresses.UI_POOL_DATA_PROVIDER,
    args: market && user ? [market?.addresses.LENDING_POOL_ADDRESS_PROVIDER, user] : undefined,
  }).data?.[0] as UserReserveData[]

  useEffect(() => {
    setMarket(marketsData?.find((market) => market.chainId === chain?.id) ?? null)
  }, [chain])

  useEffect(() => {
    if (data) {
      let balanceInUsd = 0
      let collateralInUsd = 0
      let totalDebtInUsd = 0

      const usdData = data.map((userReserveData) => {
        const reserveData = reservesData?.[0].find((reserve) => reserve.underlyingAsset === userReserveData.underlyingAsset) as ReserveData
        const tokenPriceInUsd = Number(reserveData?.priceInMarketReferenceCurrency) / Number(reservesData?.[1].marketReferenceCurrencyPriceInUsd)
        const amountInUsd = (Number(userReserveData.scaledATokenBalance) / 10 ** Number(reserveData?.decimals)) * tokenPriceInUsd
        const debtInUsd = (Number(userReserveData.scaledVariableDebt) / 10 ** Number(reserveData?.decimals)) * tokenPriceInUsd

        balanceInUsd += amountInUsd
        totalDebtInUsd += debtInUsd

        if (reserveData?.usageAsCollateralEnabled) collateralInUsd += amountInUsd

        return {
          ...userReservesData,
          reserveData,
          tokenPriceInUsd,
          amountInUsd,
          debtInUsd,
        }
      }) as UsdData[]

      console.log(usdData)

      setUserReservesData(data)
      setBalanceInUsd(balanceInUsd)
      setCollateralInUsd(collateralInUsd)
      setTotalDebtInUsd(totalDebtInUsd)
      setUsdData(usdData)
    }
  }, [data, market, user])

  return { reservesData, userReservesData, usdData, balanceInUsd, totalDebtInUsd, collateralInUsd }
}
