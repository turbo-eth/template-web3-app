# Uniswap V3 Integration

This integration provides access to Uniswap V3 protocol data, including pool information, token data, and analytics.

## Features

- **Pool Data**: View Uniswap V3 pools with TVL, volume, and price information
- **Token Analytics**: Track top tokens by total value locked
- **Real-time Prices**: Get current prices from pool sqrtPrice
- **Historical Data**: Pool day data for analytics

## Installation

No additional installation required. This integration uses existing dependencies:

- `@tanstack/react-query` for data fetching
- `axios` for HTTP requests

## Usage

### Fetching Pools

```typescript
import { usePools, PoolList } from '@/integrations/uniswap-v3'

// In your component
const { data: pools, isLoading } = usePools(token0Address, token1Address)
```

### Fetching Top Tokens

```typescript
import { useTopTokens, TokenList } from '@/integrations/uniswap-v3'

// In your component
const { data: tokens, isLoading } = useTopTokens(20)
```

### Displaying Pool Data

```typescript
import { PoolList } from '@/integrations/uniswap-v3/components/pool-card'

// In your render
<PoolList pools={pools || []} />
```

## API Reference

### Hooks

- `usePools(token0Address?, token1Address?)` - Fetch pools for specific tokens
- `usePoolDayData(poolId, days?)` - Fetch historical pool data
- `useTokenData(tokenAddress)` - Fetch data for a specific token
- `useTopTokens(limit?)` - Fetch top tokens by TVL

### Utilities

- `getCurrentPrice(pool)` - Calculate current price from pool sqrtPrice
- `getFeeTierLabel(feeTier)` - Get human-readable fee tier label
- `FEE_TIERS` - Constants for standard fee tiers (0.05%, 0.3%, 1%)

## Fee Tiers

Uniswap V3 uses concentrated liquidity with three standard fee tiers:

| Fee Tier | Percentage | Best For |
|----------|------------|----------|
| 500      | 0.05%      | Stablecoin pairs |
| 3000     | 0.3%       | Classic pairs (ETH/USDC) |
| 10000    | 1%         | Exotic pairs |

## Resources

- [Uniswap V3 Documentation](https://docs.uniswap.org/)
- [Uniswap V3 SDK](https://github.com/Uniswap/v3-sdk)
- [Uniswap Analytics](https://info.uniswap.org/)
