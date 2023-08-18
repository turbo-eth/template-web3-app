# Aave - TurboETH Integration

This React Hook integrates with [Aave](https://aave.com/), enabling users to supply and borrow assets. The integration is built using [Wagmi CLI](https://wagmi.sh/cli/commands/generate), interacting with the Aave [UiPoolDataProvider](https://docs.aave.com/developers/periphery-contracts/uipooldataproviderv3) and [Pool](https://docs.aave.com/developers/core-contracts/pool) contracts.

## Features

- Get pools and users data on Aave with the `useAave` hook
- Interact with the pool contract using Wagmi's generated hooks

## Hooks

### `useAave()`

The `useAave()` hook retrieves and computes various data related to the user's activities on the Aave lending protocol.

**Parameters:**

The hook doesn't take any parameters.

**Returns:**

The hook returns an object `data` with the following properties:

- `reservesData`: An array of data on the reserves fetched from the Aave protocol, with information about each asset in the pool, such as total liquidity, total borrowings, liquidity rate, variable borrow rate, and more.

- `userReservesData`: An array of data about the user's reserves in the Aave protocol. This data includes information about each asset the user has in the pool.

- `usdData`: An array derived from `userReservesData`, where each element is enriched with additional data like `reserveData`, `tokenPriceInUsd`, `amountInUsd`, and `debtInUsd`.

- `balanceInUsd`: The user's total balance in USD, as calculated based on the user's reserves data.

- `totalDebtInUsd`: The user's total debt in USD, as calculated based on the user's reserves data.

- `collateralInUsd`: The total collateral in USD, as calculated based on the user's reserves data.

- `maxBorrowableInUsd`: The maximum amount the user can borrow in USD, calculated based on the user's reserves data.

- `healthFactor`: A metric calculated based on the user's collateral and debt that indicates the health of the user's position in the protocol.

- `averageSupplyApy`: The average annual percentage yield (APY) for supplying assets, calculated based on the user's reserves data.

- `averageBorrowApy`: The average APY for borrowing assets, calculated based on the user's reserves data.

- `averageNetApy`: The average net APY, calculated based on the user's reserves data.

- `poolAddress`: The address of the Aave lending pool.

**Behavior:**

- On initial render, and whenever there's a change in the user's reserves data, reserves data, market, or user, the hook calculates and updates multiple financial parameters.

**Example:**

```javascript
const { data } = useAave()
```

Also check the hooks generated at `integrations/aave/generated/aave-wagmi.ts`

## File Structure

```
integrations/aave
├── abis
│ ├── pool-abi.ts
│ └── ui-pool-data-provider-abi.ts
├── components
│ ├── asset-to-borrow-item.tsx
│ ├── asset-to-supply-item.tsx
│ ├── borrowed-assets-item.tsx
│ ├── general-info.tsx
│ ├── health-factor.tsx
│ ├── list-assets-to-borrow.tsx
│ ├── list-assets-to-supply.tsx
│ ├── list-borrowed-assets.tsx
│ ├── list-supplied-assets.tsx
│ ├── spinner.tsx
│ └── supplied-assets-item.tsx
├── generated
│ └── aave-wagmi.ts
├── hooks
│ └── use-aave.ts
├── utils
│ ├── index.ts
│ ├── market-config.ts
│ └── types.ts
│── wagmi.config.ts
└── README.md
```
