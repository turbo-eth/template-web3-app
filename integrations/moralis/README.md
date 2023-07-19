# Moralis - TurboETH Integration

This integration adds the [Moralis](https://moralis.io/) Web3 APIs to TurboETH. It currently supports the [Transaction API](https://moralis.io/api/transaction/) and [Events API](https://moralis.io/api/events/). Built on top of the [`moralis`](https://www.npmjs.com/package/moralis) SDK, this integration provides a suite or api routes, React hooks and components, enabling developers to build Web3 apps fed with multi-chain web3 data.

## Features

### Transaction API

- [Get transaction by hash](https://docs.moralis.io/web3-data-api/evm/reference/get-transaction) - Get the contents of a transaction by the given transaction hash.
- [Get decoded transaction by hash](https://docs.moralis.io/web3-data-api/evm/reference/get-decoded-transaction) - Get the contents of a transaction by the given transaction hash.
- [Get native transactions by wallet](https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-transactions) - Get native transactions ordered by block number in descending order.
- [Get decoded transactions by wallet](https://docs.moralis.io/web3-data-api/evm/reference/get-decoded-wallet-transaction) - Get native transactions and logs ordered by block number in descending order.
- [Get internal transactions by transaction hash](https://docs.moralis.io/web3-data-api/evm/reference/get-internal-transactions) - Get the contents of a internal transaction by transaction hash.

### Events API

- [Get logs by contract](https://docs.moralis.io/web3-data-api/evm/reference/get-contract-logs) - Get the logs for a contract.
- [Get events by contract](https://docs.moralis.io/web3-data-api/evm/reference/get-contract-events) - Get events for a contract ordered by block number in descending order.

## API Routes

### Transaction API

- `api/transactions`: Route handler that accepts a dynamic route for the method, the method is used in the moralis SDK `Moralis.EvmApi.transaction[method]`.
  Supported methods:
- `getInternalTransactions`
- `getTransactionVerbose`
- `getTransaction`
- `getWalletTransactionsVerbose`
- `getWalletTransactions`

### Events API

- `api/events`: Route handler that accepts a dynamic route for the method, the method is used in the moralis SDK `Moralis.EvmApi.events[method]`.
  Supported methods:
- `getContractLogs`
- `getContractEvents`

## Hooks

### Transaction API

- `useGetInternalTransactions`: wrapper around the `getInternalTransactions` SDK method. It also provides a raw option with JSON formatted parameters.
- `useGetTransactionVerbose`: wrapper around the `getTransactionVerbose` SDK method. It also provides a raw option with JSON formatted parameters.
- `useGetTransaction`: wrapper around the `getTransaction` SDK method. It also provides a raw option with JSON formatted parameters.
- `useGetWalletTransactionsVerbose`: wrapper around the `getWalletTransactionsVerbose` SDK method. It also provides a raw option with JSON formatted parameters.
- `useGetWalletTransactions`: wrapper around the `getWalletTransactions` SDK method. It also provides a raw option with JSON formatted parameters.

### Event API

- `useGetContractLogs`: wrapper around the `getContractLogs` SDK method. It also provides a raw option with JSON formatted parameters.
- `useGetContractEvents`: wrapper around the `getContractEvents` SDK method. It also provides a raw option with JSON formatted parameters.

## Components

The integration provides a form component for
each hook as an example of usage.

## File Structure

```
integrations/moralis
├─ api/
│  ├─ events.ts
│  ├─ transaction.ts
├─ client/
│  ├─ index.ts
├─ components/
│  ├─ events/
│  │  ├─ form-get-contract-events.tsx
│  │  ├─ form-get-contract-logs.tsx
│  ├─ transaction/
│  │  ├─ form-get-internal-transactions.tsx
│  │  ├─ form-get-transaction-verbose.tsx
│  │  ├─ form-get-transaction.tsx
│  │  ├─ form-get-wallet-transactions-verbose.tsx
│  │  ├─ form-get-wallet-transactions.tsx
│  ├─ output-data.tsx
├─ hooks/
│  ├─ events/
│  │  ├─ index.ts
│  │  ├─ use-get-contract-events.ts
│  │  ├─ use-get-contract-logs.ts
│  ├─ transaction/
│  │  ├─ index.ts
│  │  ├─ use-get-internal-transactions.ts
│  │  ├─ use-get-transaction-verbose.ts
│  │  ├─ use-get-transaction.ts
│  │  ├─ use-get-wallet-transactions-verbose.ts
│  │  ├─ use-get-wallet-transactions.ts
├─ utils/
│  ├─ types.ts
├─ index.ts
├─ README.md

```
