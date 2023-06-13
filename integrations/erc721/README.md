# ERC721 TurboETH Integration

This TurboETH integration provides a suite of hooks and components to facilitate interaction with ERC721 contracts. In consideration of the numerous extensions and features offered by ERC721, this integration is based in a contract from [OpenZeppelin's Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard), incorporating the following features and access controls:

**Features:**

- Mintable
- Enumerable
- URI Storage

**Access Control:**

- Ownable

## ABI and Bytecode

Within the `abis` directory, you will find the `erc721-abi.ts` file, containing the ABI from the contract that was used to generate the [Wagmi CLI](https://wagmi.sh/cli/getting-started) contract hooks. The `erc721-bytecode.ts` file contains the bytecode used for contract deployment. If you wish to use a different ERC721 contract with distinct features/extensions, simply update the ABI and bytecode, and then regenerate the Wagmi CLI hooks using the command `pnpm wagmi generate`.

## Hooks:

- `useErc721TokenStorage`: Utilizes Jotai and local storage to persist the deployed token's address within the browser's local storage. It updates the value across all components observing it whenever a new deploy occurs.
- `useERC721Metadata`: Accepts contract and token information (contract address, chainId, tokenId, and ipfsGatewayUrl) and returns a query object from `tanstack-query` with the token metadata information. The hook and the components adhere to the "ERC721 Metadata JSON Schema" convention for metadata formatting. Learn more [here](https://eips.ethereum.org/EIPS/eip-721).

## Components:

This integration includes read and write/deploy components. The read components solely access the contract information and retrieve the response, whereas the write/deploy components are capable of deploying the contract and performing write actions, requiring a signer and a transaction to be submitted.

**Read Components:**

- `ERC721Name`: Returns the contract's name.
- `ERC721Symbol`: Returns the contract's symbol.
- `ERC721TotalSupply`: Returns the total supply of the contract.
- `ERC721OwnerOf`: Returns the owner of a specific token.
- `ERC721TokenUriName`: Returns the name of a specific token.
- `ERC721TokenUriDescription`: Returns the description of a specific token.
- `ERC721TokenUriImage`: Returns the image of a specific token.
- `Erc721Read`: Returns a card with aggregate information about the contract and a selected token ID.

**Write/Deploy Components:**

- `ERC721Deploy`: Form for contract deployment. Upon deployment, the contract address is saved in local storage under the key `erc721-token`.
- `Erc721WriteMint`: Form for minting new NFTs. Only the contract owner can mint new NFTs.
- `Erc721WriteApprove`: Form for approving an address's permission to transfer a token on behalf of the token holder. Only the token holder can perform the approve transaction.
- `Erc721WriteTransfer`: Form for transferring a token to a different address. Only a token owner or approved address can transfer.

File Structure

```
integrations/erc721
├─ abis/
│  ├─ erc721-abi.ts
│  ├─ erc721-bytecode.ts
├─ components/
│  ├─ erc721-deploy.tsx
│  ├─ erc721-name.tsx
│  ├─ erc721-owner-of.tsx
│  ├─ erc721-read.tsx
│  ├─ erc721-symbol.tsx
│  ├─ erc721-token-uri-description.tsx
│  ├─ erc721-token-uri-image.tsx
│  ├─ erc721-token-uri-name.tsx
│  ├─ erc721-total-supply.tsx
│  ├─ erc721-write-approve.tsx
│  ├─ erc721-write-mint.tsx
│  ├─ erc721-write-transfer.tsx
├─ hooks/
│  ├─ use-erc721-metadata.ts
│  ├─ use-erc721-token-storage.ts
├─ generated/
│  ├─ erc721-wagmi.ts
├─ index.ts
├─ wagmi.config.ts
├─ README.md
```
