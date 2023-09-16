# DefiLlama TurboETH Integration

This integration allows you to fetch data from [DefiLlama](https://defillama.com/) and convert it to a readable format.

## Features

- Fetch DefiLlama data
- Convert DefiLlama input/output data to easily readable format

## Components

`FormChart`: Renders a form to input a token info and historical data chart

`FormCurrentPrice`: Renders a form to input a token info and current price

`OutputData`: Renders a textArea with the output data

## Hooks

These hooks are react-query wrappers for the [DefiLlama API](https://defillama.com/docs/api).

### Query hooks

`useChart`: Fetches the token prices at regular time intervals

`useCurrentTokenPrice`: Fetches the current price of a token from DeFi Llama

`useCurrentERC20TokenPrice`: Wrapper around `useCurrentTokenPrice` that fetches the current price of an ERC20 token for the given chain. Defaults to the current chain.

## File Structure

```
integrations/defi-llama/
├─ components/
│  ├─ form-chart.tsx
│  ├─ form-current-price.tsx
│  ├─ output-data.tsx

├─ hooks/
│  ├─ coins/
│  │  ├─ index.ts
│  │  ├─ use-chart.ts
│  │  ├─ use-current-token-price.ts
├─ utils/
│  ├─ index.ts
│  ├─ types.ts
├─ index.ts
├─ README.md
```
