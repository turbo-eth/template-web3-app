# Unlock Protocol - TurboETH Integration 

This integration allows you to create locks, view owned keys and locks, as well as view stats for specific locks. 
The also includes an example of using a lock as a paywall, and will require the lock be purchased before access is granted. 

## Features
- Implements The Graph protocol to query information from unlock protocol.
- Lists all owned locks on current chain (supports mumbai and goerli)
- Lists all owned keys on current chain (supports mumbai and goerli)
- Interact with Unlock Protocol to create a new lock via the create lock form component
- Paywall example with an already deployed example lock
- View lock statistics, and purchase keys from created locks.

## Components
`ButtonKeyCheckout()`
Opens the checkout modal for a specified key. 

'FromDeployLock()'
For to create and deploy new locks. 

'KeyPreview()'
Simply a preview card for the user keys list.

'LockPreview()'
Simply a preview card for the user locks list.

'LockStats()'
Simple list of lock information for a specified lock.

'PaywalScript()'
Configures the example paywall.

'UserKeys()'
Displays all keys owned by the user for the connected chain. 

`UserLocks()`
Displays all locks owned by the user for the connected chain.

## Hooks 
`UseDeployLock()`
React hook to interact with unlock protocol smart contracts.

`UseUnlockSubgraph()`
React hook to interact with The Graph protocol, and query information 
from unlock protocol subgraphs.

## Queries
`LockStatsQuery`
Retrieves information for a specified lock.

`UserKeysQuery`
Retreives all keys owned by user.

`UserLocksQuery`
Retrieves all locks owned by user.

## File Structure 
```
integrations/unlock
├── components
│   ├── button-key-checkout.tsx
│   ├── form-deploy-lock.tsx
│   ├── key-preview.tsx
│   ├── lock-preview.tsx
│   ├── lock-stats.tsx
│   ├── paywall-script.tsx
│   ├── user-keys.tsx
│   └── user-locks.tsx
├── hooks
│   ├── use-deploy-lock.tsx
│   └── use-unlock-subgraph.tsx
├── queries
│   ├── lock-stats-query.graphql
│   ├── user-keys-query.graphql
│   └── user-locks-query.graphql
└── README.md

app/(general)/integration/unlock
├── layout.tsx
├── [lockId]
│   └── page.tsx
├── page.tsx
└── paywall
    └── page.tsx
```
