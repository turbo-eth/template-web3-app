# PoolTogether - TurboETH Integration

[PoolTogether](https://pooltogether.com/) is a decentralized protocol that combines savings and lottery mechanics. It allows users to pool their funds together, generating interest, and providing them with a chance to win prizes.

This React Hook provides developers with a streamlined way to deposit or withdraw funds from [PoolTogether](https://pooltogether.com/) on Ethereum, Polygon and Optimism chains.


## Features

- Deposit on PoolTogether V4
- Withdraw from PoolTogether V4

---

## Components
`PoolTogetherFormWithdraw`
A React component that renders a form to withdraw from PoolTogether.

`PoolTogetherFormDeposit`
A React component that renders a form to deposit on PoolTogether.
Users can choose the amount of approval if they have never interacted with the protocol.

**Minimum deposit is 2 USDC.**

---

## Hooks
`useLoadContractFromChainId` :  Return used contracts from the current network

`useUsdcApproval` :  Return true if a user's USDC allowance is sufficient, false otherwise.

`useUserBalanceDeposit` :  Return of the user's balance for the depositable token

`useUserBalanceWithdraw` :  Return of the user's balance for the withdrawable token




## File Structure
```
integrations/pooltogether-v4
├─ abis/
│  ├─ yield-source-prize-pool-abi.ts
│  ├─ yield-source-prize-pool-bytecode.ts
├─ components/
│  ├─ form-yield-source-prize-pool-deposit.tsx
│  ├─ form-yield-source-prize-pool-withdraw.tsx
├─ hooks/
│  ├─ use-load-contract-from-chain-id.tsx
│  ├─ use-usdc-approval.tsx
│  ├─ use-user-balance-deposit.tsx
│  ├─ use-user-balance-withdraw.tsx
├─ utils/
│  ├─ prize-pool-contract-list.ts
│  ├─ ticket-contract-list.ts
│  ├─ usdc-contract-list.ts
├─ README.md
```