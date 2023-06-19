# ERC20 TurboETH Integration

This TurboETH integration provides a suite of hooks and components to facilitate interaction with ERC20 contracts.

## ABI and Bytecode

Within the `abis` directory, you will find the `erc-20abi.ts` file, containing the ABI from the contract that was used to generate the [Wagmi CLI](https://wagmi.sh/cli/getting-started) contract hooks. The `erc20-bytecode.ts` file contains the bytecode used for contract deployment. If you wish to use a different ERC20 contract with distinct features/extensions, simply update the ABI and bytecode, and then regenerate the Wagmi CLI hooks using the command `pnpm wagmi generate`.

## Hooks:

- `useErc20TokenStorage`: Utilizes Jotai and local storage to persist the deployed token's address within the browser's local storage. It updates the value across all components observing it whenever a new deploy occurs.

## Components:

This integration includes read and write/deploy components. The read components solely access the contract information and retrieve the response, whereas the write/deploy components are capable of deploying the contract and performing write actions, requiring a signer and a transaction to be submitted.

**Read Components:**

- `ERC20Image`: Returns the image of the token.
- `ERC20Name`: Returns the contract's name.
- `ERC20Symbol`: Returns the contract's symbol.
- `ERC20TotalSupply`: Returns the total supply of the contract.
- `ERC20Decimals`: Returns the decimals of the token.
- `ERC20Balance`: Returns the balance of an address.
- `Erc20Read`: Returns a card with aggregate information about the contract.
- `ERC20EventMint`: Tracks mint events (transfer from the zero address) and displays the log of information.
- `ERC20EventTransfer`: Tracks transfer events and displays the log of information.

**Write/Deploy Components:**

- `ERC20Deploy`: Form for contract deployment. Upon deployment, the contract address is saved in local storage under the key `erc20-token`.
- `Erc20WriteMint`: Form for minting new tokens.
- `Erc20WriteTransfer`: Form for transferring a tokens to a different address.

File Structure

```
integrations/erc20
├─ abis/
│  ├─ erc20-abi.ts
│  ├─ erc20-bytecode.ts
│  ├─ erc20-mintable-abi.ts
│  ├─ erc20-mintable-bytecode.ts
├─ components/
│  ├─ erc20-deploy.tsx
│  ├─ erc20-event-mint.tsx
│  ├─ erc20-event-transfer.tsx
│  ├─ erc20-read.tsx
│  ├─ erc20-set-token-storage.tsx
│  ├─ erc20-write-mint.tsx
│  ├─ erc20-write-transfer.tsx
├─ hooks/
│  ├─ use-erc20-token-storage.ts
├─ generated/
│  ├─ erc20-wagmi.ts
├─ wagmi.config.ts
├─ README.md
```
