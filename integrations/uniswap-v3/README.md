# Uniswap V3 Base TurboETH Integration

This integration adds a clean, public-data dashboard for Uniswap V3 activity on Base.

## Features

- Public protocol overview powered by the Goldsky-managed Uniswap V3 Base subgraph
- Recent 7-day snapshots for Base trading volume and revenue
- Featured blue-chip token cards for Base-native liquidity
- Direct token lookup by Base contract address

## Why this integration

The existing TurboETH template already demonstrates wallet UX, identity, messaging, and analytics patterns. This integration adds a practical DeFi analytics slice that:

- works without private API keys
- stays focused on a single network and public data source
- is easy to fork into governance, treasury, LP, or token intelligence apps

## Files

```text
integrations/uniswap-v3/
|- client.ts
|- hooks/
|  |- use-daily-snapshots.ts
|  |- use-protocol-stats.ts
|  |- use-token-summary.ts
|- components/
|  |- daily-snapshots-table.tsx
|  |- featured-token-card.tsx
|  |- protocol-overview.tsx
|  |- stat-card.tsx
|  |- token-lookup.tsx
|- utils.ts
|- index.ts
|- README.md
```

## Data source

The integration uses the public Goldsky endpoint for `uniswap-v3-base/prod`:

- `https://api.goldsky.com/api/public/project_cl8ylkiw00krx0hvza0qw17vn/subgraphs/uniswap-v3-base/prod/gn`

## Route

- `/integration/uniswap-v3`
