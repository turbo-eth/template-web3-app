# Connext - TurboETH Integration

This React Hook integrates with [Connext](https://connext.network/), enabling users to bridge assets across [multiple chains](https://docs.connext.network/resources/supported-chains). The integration is built on top of the [Connext SDK](https://docs.connext.network/developers/guides/sdk-frontend-integration).

## Features

- Bridge ERC20 tokens across multiple chains easily with the `useXcall` hook
- Get latest connext transfers with the `useLatestTransfers` hook
- Helper hooks like `approve-if-needed`

## API

### `GET /api/connext/approve-if-needed`

Checks if an asset needs to be approved for a bridging transaction and performs the approval if necessary.

**Query Parameters:**

- `originDomain`: The domain ID of the origin chain.
- `assetAddress`: The address of the asset to be bridged.
- `amount`: The amount of the asset to bridge, in the asset's native decimal precision.
- `signer`: The address of the account to sign the transaction.
- `environment`: A string indicating the network environment, either `mainnet` or `testnet`.

**Response:**

- Returns a JSON object with the `txRequest` property, representing the transaction request for the approval.

**Error Handling:**

- Returns a 400 status code with a message if any query parameter is missing.
- Returns a 400 status code with a message if the `environment` query parameter is not a valid value (`mainnet` or `testnet`).
- Returns a 500 status code with a message if there's an internal server error.

### `GET /api/connext/estimated-relayer-fee`

Estimates the relayer fee for a bridging transaction from an `originDomain` to a `destinationDomain` in a certain `environment` (mainnet or testnet).

**Query Parameters:**

- `originDomain`: The domain ID of the origin chain.
- `destinationDomain`: The domain ID of the destination chain.
- `environment`: A string indicating the network environment, either `mainnet` or `testnet`.

**Response:**

- Returns a JSON object with a `relayerFee` property, representing the estimated relayer fee for the transaction. The `relayerFee` is a string representing a BigNumber.

**Error Handling:**

- Returns a 400 status code with a message if the `originDomain`, `destinationDomain`, or `environment` query parameter is missing.
- Returns a 400 status code with a message if the `environment` query parameter is not a valid value (`mainnet` or `testnet`).
- Returns a 500 status code with a message if there's an internal server error.

### `GET /api/connext/xcall`

Initiates a cross-chain transfer.

**Query Parameters:**

- `origin`: The domain ID of the origin chain.
- `destination`: The domain ID of the destination chain.
- `to`: The address of the recipient on the destination chain.
- `asset`: The address of the asset to be bridged.
- `amount`: The amount of the asset to bridge, in the asset's native decimal precision.
- `relayerFee`: The relayer fee for the transaction.
- `slippage`: The slippage tolerance for the transaction.
- `signer`: The address of the account to sign the transaction.
- `environment`: A string indicating the network environment, either `mainnet` or `testnet`.

**Response:**

- Returns a JSON object with the `txRequest` property, representing the transaction request for the cross-chain transfer. The `txRequest` includes the `value` property, which is the `relayerFee`.

**Error Handling:**

- Returns a 400 status code with a message if any query parameter is missing.
- Returns a 400 status code with a message if the `environment` query parameter is not a valid value (`mainnet` or `testnet`).
- Returns a 500 status code with a message if there's an internal server error.

## Hooks
### `useSupportedTransfer({ originChainId, destinationChainId, assetDataContracts })`

Hook to check whether a given asset transfer between two chains is supported. It takes an object argument with the following properties:

- `originChainId`: The chain ID of the origin chain.
- `destinationChainId`: The chain ID of the destination chain.
- `assetDataContracts`: An array of contract data objects, each adhering to the `Contract` interface.

The function returns `false` if any of the parameters are `undefined` or if the asset contracts for the given chain IDs do not exist. Otherwise, it returns `true`.

**Error Handling:**

- Returns `false` if any parameter is missing.
- Returns `false` if the contracts for the given chain IDs do not exist.

**Example:**

```javascript
const isSupported = useSupportedTransfer({ 
  originChainId: 1, 
  destinationChainId: 42, 
  assetDataContracts: contractData 
});
```

### `useLatestTransfers(isMainnet)`

Fetches the latest asset transfers executed by the current account

**Parameters:**

- `isMainnet`: A boolean value indicating whether to fetch transfers from the mainnet (`true`) or the testnet (`false`).

**Returns:**

The hook returns an array of the latest transfers. Each transfer object adheres to the `Transfer` interface.

**Behavior:**

- On initial render and every 10 seconds thereafter, the hook makes a `GET` request to the `/api/connext/latest-transfers` endpoint, passing the current account address and the environment (derived from `isMainnet`) as query parameters.
- The hook updates its state with the received transfers.
- If the request fails, the error is logged to the console.

**Error Handling:**

- Logs to the console if there's an error with the fetch request.

**Example:**

```javascript
const transfers = useLatestTransfers(true); // You might want to use a state variable for this c:
```

### `useEstimatedAmount({ isMainnet, originDomain, destinationDomain, originTokenAddress, amount })`

Calculates the estimated amount received on the destination domain for a bridge transaction. It also checks whether the transaction qualifies for the fast path.

**Parameters:**

- `isMainnet`: A boolean value indicating whether to use the mainnet (`true`) or the testnet (`false`).
- `originDomain`: The domain ID of the origin chain.
- `destinationDomain`: The domain ID of the destination chain.
- `originTokenAddress`: The address of the token to be bridged from the origin.
- `amount`: The amount of the origin token to bridge, in the origin token's native decimal precision.

**Returns:**

An object with the following properties:

- `estimatedAmount`: The estimated amount to be received on the destination domain. This is a string representing a BigNumber.
- `isFastPath`: A boolean value indicating whether the transaction qualifies for the fast path.
- `isLoading`: A boolean value indicating whether the calculation is in progress.

**Behavior:**

- On initial render and whenever any of the parameters change, the hook waits for 3 seconds and then makes a `GET` request to the `/api/connext/estimated-amount` endpoint, passing the parameters as query parameters.
- The hook updates its state with the received estimated amount and fast path eligibility.
- If the request fails, the error is logged to the console.

**Error Handling:**

- Logs to the console if there's an error with the fetch request.

**Example:**

```javascript
const { estimatedAmount, isFastPath, isLoading } = useEstimatedAmount({
  isMainnet: true, 
  originDomain: '1634886255', 
  destinationDomain: '6778479', 
  originTokenAddress: '0x...', 
  amount: ethers.utils.parseUnits('10', 'ether')
});
```

### `useEstimatedRelayerFee({ isMainnet, originDomain, destinationDomain })`

Calculates the estimated relayer fee for a bridging transaction between two domains.

**Parameters:**

- `isMainnet`: A boolean value indicating whether to use the mainnet (`true`) or the testnet (`false`).
- `originDomain`: The domain ID of the origin chain.
- `destinationDomain`: The domain ID of the destination chain.

**Returns:**

The hook returns a string representing the estimated relayer fee.

**Behavior:**

- On initial render and whenever the `originDomain` or `destinationDomain` parameters change, the hook waits for 3 seconds and then makes a `GET` request to the `/api/connext/estimated-relayer-fee` endpoint, passing the parameters as query parameters.
- The hook updates its state with the received estimated relayer fee.
- If the request fails, the error is logged to the console.

**Error Handling:**

- Logs to the console if there's an error with the fetch request.

**Example:**

```javascript
const estimatedRelayerFee = useEstimatedRelayerFee({
  isMainnet: true, 
  originDomain: '16778479', 
  destinationDomain: '1634886255', 
});
```

### `useApproveIfNeeded({ isMainnet, originDomain, assetAddress, amount })`

Initiates an approval transaction if it's needed for a bridging transaction. 

**Parameters:**

- `isMainnet`: A boolean value indicating whether to use the mainnet (`true`) or the testnet (`false`).
- `originDomain`: The domain ID of the origin chain.
- `assetAddress`: The address of the token to be bridged from the origin.
- `amount`: The amount of the origin token to bridge, in the origin token's native decimal precision.

**Returns:**

An object with the following properties:

- `request`: The transaction request for the approval, or `undefined` if an error occurred or if the approval is not needed. This is an object adhering to the `TransactionRequest` interface from the `viem` library.
- `isLoading`: A boolean value indicating whether the calculation is in progress.

**Behavior:**

- On initial render and whenever any of the parameters change, the hook makes a `GET` request to the `/api/connext/approve-if-needed` endpoint, passing the parameters and the signer address as query parameters. The signer address is obtained from the `useAccount` hook from the `wagmi` library.
- The hook updates its state with the received transaction request.
- If the request fails, the error is logged to the console.

**Error Handling:**

- Logs to the console if there's an error with the fetch request.

**Example:**

```javascript
const { request, isLoading } = useApproveIfNeeded({
  isMainnet: true, 
  originDomain: '1634886255', 
  assetAddress: '0x...', 
  amount: ethers.utils.parseUnits('10', 'ether')
});
```

### `useEstimatedRelayerFee({ isMainnet, originDomain, destinationDomain })`

Calculates the estimated relayer fee for a bridging transaction between two domains.

**Parameters:**

- `isMainnet`: A boolean value indicating whether to use the mainnet (`true`) or the testnet (`false`).
- `originDomain`: The domain ID of the origin chain.
- `destinationDomain`: The domain ID of the destination chain.

**Returns:**

The hook returns a string representing the estimated relayer fee.

**Behavior:**

- On initial render and whenever the `originDomain` or `destinationDomain` parameters change, the hook waits for 3 seconds and then makes a `GET` request to the `/api/connext/estimated-relayer-fee` endpoint, passing the parameters as query parameters.
- The hook updates its state with the received estimated relayer fee.
- If the request fails, the error is logged to the console.

**Error Handling:**

- Logs to the console if there's an error with the fetch request.

**Example:**

```javascript
const estimatedRelayerFee = useEstimatedRelayerFee({
  isMainnet: true, 
  originDomain: '16778479', 
  destinationDomain: '1634886255', 
});
```

### `useXcall({ isMainnet, origin, destination, to, asset, amount, relayerFee })`

Executes a cross-chain call (Xcall) to initiate a transaction from one domain to another.

**Parameters:**

- `isMainnet`: A boolean value indicating whether to use the mainnet (`true`) or the testnet (`false`).
- `origin`: The domain ID of the origin chain.
- `destination`: The domain ID of the destination chain.
- `to`: The address of the destination chain that will receive the asset.
- `asset`: The asset (in the form of a token address) that is being sent.
- `amount`: The amount of the asset that is being sent.
- `relayerFee`: The fee for the relayer that will process the bridging transaction.

**Returns:**

The hook returns an object with the following properties:

- `isLoading`: A boolean value indicating whether the Xcall is currently in progress.
- `error`: An error object if there was an error executing the Xcall, or `null` if there was no error.
- `result`: The result of the Xcall, or `null` if the Xcall has not been executed or completed.

**Behavior:**

- When invoked, the hook makes a `POST` request to the `/api/connext/xcall` endpoint, passing the parameters as part of the request body.
- The hook updates its state with the ongoing Xcall status, the error (if any), and the result of the Xcall.

**Error Handling:**

- If there's an error with the fetch request, it updates the state with the error object.

**Example:**

```javascript
const { isLoading, error, result } = useXcall({
  isMainnet: true,
  origin: '16778479',
  destination: '1634886255',
  to: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  amount: '1.5',
  relayerFee: '0.01',
});
```

## File Structure

```
integrations/connext
├─ api/
│ ├─ latest-transfers.tsx
│ ├─ estimated-amount.tsx
│ ├─ estimated-relayer-fee.tsx
│ ├─ approve-if-needed.tsx
│ ├─ xcall.tsx
├─ components/
│ ├─ form-connext-xtransfer.tsx
│ ├─ latest-transfers.tsx
│ ├─ transfer.tsx
├─ hooks/
│ ├─ use-latest-transfers.ts
│ ├─ use-supported-transfer.ts
│ ├─ use-xcall.ts
│ ├─ use-approve-if-needed.ts
│ ├─ use-estimated-relayer-fee.ts
│ ├─ use-estimated-amount.ts
├─ utils/
│ ├─ assets/
│ │ ├─ index.ts
│ │ ├─ mainnet.ts
│ │ ├─ testnet.ts
│ ├─ chains/
│ │ ├─ index.ts
│ │ ├─ mainnet.ts
│ │ ├─ testnet.ts
│ ├─ types.ts
├─ client.ts
├─ README.md
```
