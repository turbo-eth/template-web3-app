# DefiLlama TurboETH Integration

This integration allows you to fetch data from [DefiLlama](https://defillama.com/) and convert it to a readable format.

## Features

- Fetch DefiLlama data
- Convert DefiLlama input/output data to easily readable format

## Components

`FormChart`: Renders a form to input a token info and historical data chart

`FormCurrentPrice`: Renders a form to input a token info and current price

`FormHistoricalPrice`: Renders a form to input a token info and historical price given a timestamp

`FormPercentageChange`: Renders a form to input a token info and percentage change given a timestamp and period of time

`OutputData`: Renders a textArea with the output data

## Hooks

These hooks are react-query wrappers for the [DefiLlama API](https://defillama.com/docs/api).

### Query hooks

`useChart`: Fetches the token prices at regular time intervals.

`useCurrentTokenPrice`: Fetches the current price of a token from DeFi Llama.

`useCurrentNativeTokenPrice`: Wrapper around `useCurrentTokenPrice` that fetches the current price of the native token of the given chain. Defaults to the current chain.

`useCurrentERC20TokenPrice`: Wrapper around `useCurrentTokenPrice` that fetches the current price of an ERC20 token for the given chain. Defaults to the current chain.

`useCurrentTokenPrice`: Fetches the historical price of a token from DeFi Llama given a timestamp.

`useHistoricalNativeTokenPrice`: Wrapper around `useHistoricalTokenPrice` that fetches the historical price of the native token for the given chain. Defaults to the current chain.

`useHistoricalERC20TokenPrice`: Wrapper around `useHistoricalTokenPrice` that fetches the historical price of an ERC20 token for the given chain. Defaults to the current chain.

`useTokenPercentageChange`: Fetches the percentage change in price of a token from DeFi Llama given a timestamp and period of time.

`useNativeTokenPercentageChange`: Wrapper around `useTokenPercentageChange` that fetches the percentage change in price of the native token for the given chain. Defaults to the current chain.

`useERC20TokenPercentageChange`: Wrapper around `useTokenPercentageChange` that fetches the percentage change in price of an ERC20 token for the given chain. Defaults to the current chain.

## File Structure

```
integrations/defi-llama/
├─ components/
│  ├─ form-chart.tsx
│  ├─ form-current-price.tsx
│  ├─ form-historical-price.tsx
│  ├─ form-percentage-change.tsx
│  ├─ index.ts
│  ├─ output-data.tsx
├─ hooks/
│  ├─ coins/
│  │  ├─ index.ts
│  │  ├─ use-chart.ts
│  │  ├─ use-current-token-price.ts
│  │  ├─ use-historical-token-price.ts
│  │  ├─ use-token-percentage-change.ts
├─ utils/
│  ├─ index.ts
│  ├─ types.ts
├─ index.ts
├─ README.md
```
