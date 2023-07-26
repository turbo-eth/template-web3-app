export const uiPoolDataProvider = [
  {
    inputs: [
      {
        internalType: 'contract IChainlinkAggregator',
        name: '_networkBaseTokenPriceInUsdProxyAggregator',
        type: 'address',
      },
      {
        internalType: 'contract IChainlinkAggregator',
        name: '_marketReferenceCurrencyPriceInUsdProxyAggregator',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'ETH_CURRENCY_UNIT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILendingPoolAddressesProvider',
        name: 'provider',
        type: 'address',
      },
    ],
    name: 'getReservesData',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlyingAsset',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'baseLTVasCollateral',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveLiquidationThreshold',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveLiquidationBonus',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveFactor',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'usageAsCollateralEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'borrowingEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'stableBorrowRateEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isFrozen',
            type: 'bool',
          },
          {
            internalType: 'uint128',
            name: 'liquidityIndex',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'variableBorrowIndex',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'liquidityRate',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'variableBorrowRate',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'stableBorrowRate',
            type: 'uint128',
          },
          {
            internalType: 'uint40',
            name: 'lastUpdateTimestamp',
            type: 'uint40',
          },
          {
            internalType: 'address',
            name: 'aTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'stableDebtTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'variableDebtTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'interestRateStrategyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'availableLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalPrincipalStableDebt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'averageStableRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'stableDebtLastUpdateTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalScaledVariableDebt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'priceInMarketReferenceCurrency',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'variableRateSlope1',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'variableRateSlope2',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'stableRateSlope1',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'stableRateSlope2',
            type: 'uint256',
          },
        ],
        internalType: 'struct IUiPoolDataProvider.AggregatedReserveData[]',
        name: '',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketReferenceCurrencyUnit',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'marketReferenceCurrencyPriceInUsd',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'networkBaseTokenPriceInUsd',
            type: 'int256',
          },
          {
            internalType: 'uint8',
            name: 'networkBaseTokenPriceDecimals',
            type: 'uint8',
          },
        ],
        internalType: 'struct IUiPoolDataProvider.BaseCurrencyInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILendingPoolAddressesProvider',
        name: 'provider',
        type: 'address',
      },
    ],
    name: 'getReservesList',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILendingPoolAddressesProvider',
        name: 'provider',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserReservesData',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlyingAsset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'scaledATokenBalance',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'usageAsCollateralEnabledOnUser',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'stableBorrowRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'scaledVariableDebt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'principalStableDebt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'stableBorrowLastUpdateTimestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct IUiPoolDataProvider.UserReserveData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
