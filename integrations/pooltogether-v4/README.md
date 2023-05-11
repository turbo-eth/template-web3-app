# PoolTogether TurboETH Integration


## Features
- Deposit on PoolTogether V4
- Withdraw from PoolTogether V4
---

## File Structure
```
integrations/pooltogethet-v4
├─ abis/
│  ├─ yield-source-prize-pool-abi.ts
│  ├─ yield-source-prize-pool-bytecode.json
├─ components/
│  ├─ form-yield-source-prize-pool-deposit.tsx
│  ├─ form-yield-source-prize-pool-withdraw.tsx
├─ hooks/
│  ├─ use-load-contract-from-chain-id.tsx
│  ├─ use-usdc-approval.tsx
│  ├─ use-user-balance-deposit.tsx
│  ├─ use-user-balance-withdraw.tsx
├─ prize-pool-contract-list.ts
├─ ticket-contract-list.ts
├─ usdc-contract-list.ts
├─ README.md
```