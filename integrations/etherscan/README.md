# Etherscan TurboETH Integration

Welcome to the "Etherscan" TurboETH Integration! This integration allows users to interact with the Ethereum blockchain data through the Etherscan API, retrieving transaction history and account details.

## Features

- Fetch transaction history for a given Ethereum account.
- Display the transaction history in a formatted table, displaying the sender, receiver, creation time, and sent amount.
- A custom React hook `useEtherscanAccountTransactions` for fetching transaction data.

## API

### Actions

#### `appEtherscanAccountTransactions(params?: BlockPagination)`

Fetches transaction history of an Ethereum account through the Etherscan API.

**Parameters:**

- `params: BlockPagination` - pagination options to be passed to the API call.

#### `etherscanAccountTransactions(chainId: number | string, address: string, config: BlockPagination)`

Fetches transaction history of an Ethereum account through the Etherscan API by creating a client, validating the client and the address, and making the API request.

**Parameters:**

- `chainId: number | string` - Ethereum network chain ID.
- `address: string` - Ethereum address to fetch transactions for.
- `config: BlockPagination` - Pagination and sorting options for transactions.

### Components

#### `TransactionsTable({ data }: any)`

Renders a table displaying the transaction history fetched from the Etherscan API.

**Parameters:**

- `data: Array<any>` - Array of transaction objects.

### Hooks

#### `useEtherscanAccountTransactions(params?: BlockPagination, queryKey?: any)`

A React hook that fetches and returns transaction history for a given Ethereum account.

**Parameters:**

- `params: BlockPagination` - Pagination options.
- `queryKey: any` - A unique key for this particular data fetch. This is used by React Query for caching and other features.

## File Structure

```
integrations/etherscan
├─ actions/
│  ├─ etherscan-account-transactions/
│  │  ├─ client.ts
│  │  ├─ index.ts
├─ components/
│  ├─ transactions-table.tsx
├─ hooks/
│  ├─ use-etherscan-account-transactions.ts
├─ utils/
│  ├─ constants.ts
│  ├─ get-chain-id-api-key.ts
│  ├─ get-chain-id-api-url.ts
│  ├─ get-etherscan-client.ts
│  ├─ handle-error-types.ts
│  ├─ handle-etherscan-response.ts
│  ├─ is-client-connected.ts
│  ├─ is-valid-address.ts
│  ├─ is-valid-api-service.ts
│  ├─ is-valid-chain-id-mapping.ts
│  ├─ is-valid-transaction-hash.ts
│  ├─ query-etherscan-client.ts
├─ etherscan.d.ts
├─ README.md
```
