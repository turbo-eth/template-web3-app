// disable eslint for this file due to @bgd-labs/aave-address-book import issues
/* eslint-disable */

import { ReactNode } from 'react'

import {
  AaveV3Arbitrum,
  AaveV3ArbitrumGoerli,
  AaveV3Ethereum,
  AaveV3Goerli,
  AaveV3Mumbai,
  AaveV3Optimism,
  AaveV3OptimismGoerli,
  AaveV3Polygon,
  AaveV3Sepolia,
} from '@bgd-labs/aave-address-book'
import { arbitrum, arbitrumGoerli, goerli, mainnet, optimism, optimismGoerli, polygon, polygonMumbai, sepolia } from 'wagmi/chains'

export type MarketDataType = {
  v3?: boolean
  testnet?: boolean
  marketTitle: string
  chainId: number
  enabledFeatures?: {
    liquiditySwap?: boolean
    staking?: boolean
    governance?: boolean
    faucet?: boolean
    collateralRepay?: boolean
    incentives?: boolean
    permissions?: boolean
    debtSwitch?: boolean
  }
  isFork?: boolean
  permissionComponent?: ReactNode
  disableCharts?: boolean
  subgraphUrl?: string
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: `0x${string}`
    LENDING_POOL: `0x${string}`
    WETH_GATEWAY?: `0x${string}`
    SWAP_COLLATERAL_ADAPTER?: `0x${string}`
    REPAY_WITH_COLLATERAL_ADAPTER?: `0x${string}`
    DEBT_SWITCH_ADAPTER?: `0x${string}`
    FAUCET?: `0x${string}`
    PERMISSION_MANAGER?: `0x${string}`
    WALLET_BALANCE_PROVIDER: `0x${string}`
    L2_ENCODER?: `0x${string}`
    UI_POOL_DATA_PROVIDER: `0x${string}`
    UI_INCENTIVE_DATA_PROVIDER?: `0x${string}`
    COLLECTOR?: `0x${string}`
    V3_MIGRATOR?: `0x${string}`
  }
  halIntegration?: {
    URL: string
    marketName: string
  }
}

export const marketsData: MarketDataType[] = [
  {
    marketTitle: 'Ethereum',
    chainId: mainnet.id,
    v3: true,
    enabledFeatures: {
      governance: true,
      staking: true,
      liquiditySwap: true,
      collateralRepay: true,
      incentives: true,
      debtSwitch: false,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Ethereum.POOL,
      WETH_GATEWAY: AaveV3Ethereum.WETH_GATEWAY,
      REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Ethereum.REPAY_WITH_COLLATERAL_ADAPTER,
      SWAP_COLLATERAL_ADAPTER: AaveV3Ethereum.SWAP_COLLATERAL_ADAPTER,
      WALLET_BALANCE_PROVIDER: AaveV3Ethereum.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3Ethereum.UI_INCENTIVE_DATA_PROVIDER,
      COLLECTOR: AaveV3Ethereum.COLLECTOR,
    },
  },
  {
    marketTitle: 'Ethereum Sepolia',
    v3: true,
    testnet: true,
    chainId: sepolia.id,
    enabledFeatures: {
      faucet: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Sepolia.POOL,
      WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
      FAUCET: AaveV3Sepolia.FAUCET,
      WALLET_BALANCE_PROVIDER: AaveV3Sepolia.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3Sepolia.UI_INCENTIVE_DATA_PROVIDER,
    },
  },
  {
    marketTitle: 'Ethereum Görli',
    v3: true,
    testnet: true,
    chainId: goerli.id,
    enabledFeatures: {
      faucet: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Goerli.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Goerli.POOL,
      WETH_GATEWAY: AaveV3Goerli.WETH_GATEWAY,
      FAUCET: AaveV3Goerli.FAUCET,
      WALLET_BALANCE_PROVIDER: AaveV3Goerli.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3Goerli.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3Goerli.UI_INCENTIVE_DATA_PROVIDER,
    },
  },

  {
    marketTitle: 'Arbitrum',
    v3: true,
    chainId: arbitrum.id,
    enabledFeatures: {
      incentives: true,
      liquiditySwap: true,
      collateralRepay: true,
      debtSwitch: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Arbitrum.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Arbitrum.POOL,
      WETH_GATEWAY: AaveV3Arbitrum.WETH_GATEWAY,
      WALLET_BALANCE_PROVIDER: AaveV3Arbitrum.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3Arbitrum.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3Arbitrum.UI_INCENTIVE_DATA_PROVIDER,
      L2_ENCODER: AaveV3Arbitrum.L2_ENCODER,
      COLLECTOR: AaveV3Arbitrum.COLLECTOR,
      SWAP_COLLATERAL_ADAPTER: AaveV3Arbitrum.SWAP_COLLATERAL_ADAPTER,
      REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Arbitrum.REPAY_WITH_COLLATERAL_ADAPTER,
      DEBT_SWITCH_ADAPTER: AaveV3Arbitrum.DEBT_SWAP_ADAPTER,
    },
  },
  {
    marketTitle: 'Arbitrum Görli',
    v3: true,
    testnet: true,
    chainId: arbitrumGoerli.id,
    enabledFeatures: {
      faucet: true,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3ArbitrumGoerli.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3ArbitrumGoerli.POOL,
      WETH_GATEWAY: AaveV3ArbitrumGoerli.WETH_GATEWAY,
      FAUCET: AaveV3ArbitrumGoerli.FAUCET,
      WALLET_BALANCE_PROVIDER: AaveV3ArbitrumGoerli.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3ArbitrumGoerli.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3ArbitrumGoerli.UI_INCENTIVE_DATA_PROVIDER,
      L2_ENCODER: AaveV3ArbitrumGoerli.L2_ENCODER,
    },
  },
  {
    marketTitle: 'Optimism Görli',
    v3: true,
    testnet: true,
    chainId: optimismGoerli.id,
    enabledFeatures: {
      faucet: true,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3OptimismGoerli.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3OptimismGoerli.POOL,
      WETH_GATEWAY: AaveV3OptimismGoerli.WETH_GATEWAY,
      FAUCET: AaveV3OptimismGoerli.FAUCET,
      WALLET_BALANCE_PROVIDER: AaveV3OptimismGoerli.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3OptimismGoerli.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3OptimismGoerli.UI_INCENTIVE_DATA_PROVIDER,
      L2_ENCODER: AaveV3OptimismGoerli.L2_ENCODER,
    },
  },
  {
    marketTitle: 'Optimism',
    v3: true,
    chainId: optimism.id,
    enabledFeatures: {
      incentives: true,
      collateralRepay: true,
      liquiditySwap: true,
      debtSwitch: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Optimism.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Optimism.POOL,
      WETH_GATEWAY: AaveV3Optimism.WETH_GATEWAY,
      WALLET_BALANCE_PROVIDER: AaveV3Optimism.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3Optimism.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3Optimism.UI_INCENTIVE_DATA_PROVIDER,
      L2_ENCODER: AaveV3Optimism.L2_ENCODER,
      COLLECTOR: AaveV3Optimism.COLLECTOR,
      SWAP_COLLATERAL_ADAPTER: AaveV3Optimism.SWAP_COLLATERAL_ADAPTER,
      REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Optimism.REPAY_WITH_COLLATERAL_ADAPTER,
      DEBT_SWITCH_ADAPTER: AaveV3Optimism.DEBT_SWAP_ADAPTER,
    },
  },
  {
    marketTitle: 'Polygon',
    chainId: polygon.id,
    v3: true,
    enabledFeatures: {
      liquiditySwap: true,
      incentives: true,
      collateralRepay: true,
      debtSwitch: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Polygon.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Polygon.POOL,
      WETH_GATEWAY: AaveV3Polygon.WETH_GATEWAY,
      REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Polygon.REPAY_WITH_COLLATERAL_ADAPTER,
      SWAP_COLLATERAL_ADAPTER: AaveV3Polygon.SWAP_COLLATERAL_ADAPTER,
      WALLET_BALANCE_PROVIDER: AaveV3Polygon.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3Polygon.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3Polygon.UI_INCENTIVE_DATA_PROVIDER,
      COLLECTOR: AaveV3Polygon.COLLECTOR,
      DEBT_SWITCH_ADAPTER: AaveV3Polygon.DEBT_SWAP_ADAPTER,
    },
  },
  {
    marketTitle: 'Polygon Mumbai',
    chainId: polygonMumbai.id,
    testnet: true,
    enabledFeatures: {
      incentives: true,
      faucet: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Mumbai.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Mumbai.POOL,
      WETH_GATEWAY: AaveV3Mumbai.WETH_GATEWAY,
      FAUCET: AaveV3Mumbai.FAUCET,
      WALLET_BALANCE_PROVIDER: AaveV3Mumbai.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3Mumbai.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3Mumbai.UI_INCENTIVE_DATA_PROVIDER,
    },
    v3: true,
  },
]
