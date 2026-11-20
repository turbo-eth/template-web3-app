# Delegatable Subscription - TurboETH Integration

This integration implements gas-less recurring token subscriptions and conditional delegations powered by the [Delegatable](https://delegatable.org/) framework and the [`DistrictERC20PermitSubscriptionsEnforcer`](https://github.com/district-labs/delegatable-enforcers/blob/main/contracts/DistrictERC20PermitSubscriptionsEnforcer.sol) smart contract.

## Features

- **Gas-less Delegated Subscriptions:** Subscribers sign an ERC-2612 `Permit` typed message and a Delegatable `Delegation` off-chain with EIP-712.
- **Enforcer Caveat Verification:** The `DistrictERC20PermitSubscriptionsEnforcer` embeds execution constraints (period interval, allowed method `0x97e18d6e`, subscription status) directly into the signature terms bytecode.
- **Local & On-Chain Revocation:** Subscriptions can be revoked on-chain by the subscriber calling `cancelSubscription()` or paused locally in the client database.
- **Client-Side Database Storage:** Utilizes Dexie IndexedDB (`useLiveQuery`) for reactive state management of active delegations, salts, and payment schedules.
- **Serverless Relayer / Cron Automation:** Automated Vercel Cron endpoint (`/api/delegatable/cron` scheduled every 30 minutes) to batch and execute due subscriptions via `verifyingContract.invoke()`.

## File Structure

```
integrations/delegatable-subscription
├─ abis/
│  ├─ delegatable-abi.ts & .json
│  ├─ delegatable-bytecode.ts & .json
│  ├─ district-erc20-permit-subscriptions-enforcer-abi.ts & .json
│  ├─ district-erc20-permit-subscriptions-enforcer-bytecode.ts & .json
│  ├─ verifying-contract-erc20-permit-subscriptions-abi.ts & .json
│  ├─ verifying-contract-erc20-permit-subscriptions-bytecode.ts & .json
├─ components/
│  ├─ form-delegatable-subscription-start.tsx
│  ├─ form-delegatable-subscription-revoke.tsx
│  ├─ form-subscription-start.tsx
│  ├─ form-subscription-end.tsx
│  ├─ delegatable-subscription-list.tsx
│  ├─ delegatable-subscription-cron-status.tsx
│  ├─ index.ts
├─ hooks/
│  ├─ use-delegatable-subscriptions.ts
│  ├─ use-start-subscription.ts
│  ├─ use-revoke-subscription.ts
│  ├─ use-execute-subscription.ts
│  ├─ index.ts
├─ utils/
│  ├─ types.ts
│  ├─ create-terms.ts
│  ├─ create-delegation.ts
│  ├─ create-permit.ts
│  ├─ create-invocation.ts
│  ├─ constants.ts
│  ├─ index.ts
├─ database.ts
├─ delegatable-wagmi.ts
├─ delegatable-enforcers-wagmi.ts
├─ wagmi.config.ts
├─ README.md
```

## How It Works

1. **Terms Bytecode Packing:**
   `encodeSubscriptionTerms(verifyingContract, salt)` packs the verifying contract address and salt into bytes: `abi.encodePacked(verifier, salt)`.

2. **Permit Approval:**
   Subscribers sign an EIP-2612 Permit giving allowance to the verifying contract without sending an on-chain transaction.

3. **Delegation Signature:**
   Subscribers sign a Delegatable Delegation authorizing the delegate (or relayer) to execute calls restricted by the enforcer.

4. **Execution (`invoke`):**
   The relayer or delegate broadcasts `invoke([SignedInvocation])` which bundles `approveSubscription` (with permit signature `v, r, s`) and `paySubscription` (with delegation authority).

5. **Revocation:**
   A subscriber can cancel their delegation at any time by calling `DistrictERC20PermitSubscriptionsEnforcer.cancelSubscription(signedDelegation, domainHash)`.

## Cron Job Configuration

Configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/delegatable/cron",
      "schedule": "*/30 * * * *"
    }
  ]
}
```
