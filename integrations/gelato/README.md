# Gelato Automate Integration

Gelato is a Web3’s decentralized backend, enabling developers to create augmented smart contracts that are automated, gasless & off-chain aware.

This integration provides useful hooks and components from Gelato Automate.

## Features

- Create Task: Simple UI for task creation&automation
- List Tasks: Effectively query and preview active tasks
- Rename or cancel tasks

## Components

`ActiveTasks` Renders list of active tasks on current network

`CreateTask` Renders create task form

`TaskView` Renders task details, option feature to rename task.

`RenameTask` Renders rename task form

## Hooks

These hooks are mostly gelato-specific wrappers for react-query. So it utilizes all the features react-query has.

For example:

```ts
const { data, isLoading, error, refetch } = useActiveTasks()
```

### Query hooks

`useGelatoAutomateSdk`: Returns Automate SDK instance based on the current network

`useIsAutomateSupported`: Returns whether Automate is supported for the current network

`useActiveTasks`: Returns active tasks based on the current network

`useActiveTasks`: Returns active tasks based on the current network

`useTask`: Returns task based on the parameters

`useAbi`: Returns abi based on the parameters and the current network

### Mutation hooks

`useNewTask`: Returns task create mutation

`useCancelTask`: Returns cancel task mutation

`useRenameTask`: Returns rename task mutation

## Environment Variables

To support ABI fetching from blockchain explorers in `CreateTask` component, it's needed to specify API keys for each explorer.

```
NEXT_PUBLIC_GELATO_SCAN_KEY_MAINNET=
NEXT_PUBLIC_GELATO_SCAN_KEY_POLYGON=
NEXT_PUBLIC_GELATO_SCAN_KEY_FANTOM=
NEXT_PUBLIC_GELATO_SCAN_KEY_ARBITRUM=
NEXT_PUBLIC_GELATO_SCAN_KEY_AVALANCHE=
NEXT_PUBLIC_GELATO_SCAN_KEY_BSC=
NEXT_PUBLIC_GELATO_SCAN_KEY_CRONOS=
NEXT_PUBLIC_GELATO_SCAN_KEY_GNOSIS=
NEXT_PUBLIC_GELATO_SCAN_KEY_OPTIMISM=
NEXT_PUBLIC_GELATO_SCAN_KEY_MOONBEAM=
NEXT_PUBLIC_GELATO_SCAN_KEY_MOONRIVER=
NEXT_PUBLIC_GELATO_SCAN_KEY_MUMBAI=
NEXT_PUBLIC_GELATO_SCAN_KEY_ARBITRUM_GOERLI=
NEXT_PUBLIC_GELATO_SCAN_KEY_GOERLI=
```

## File Structure

```
integrations/gelato/
├── abis
├── components
│   ├── active-task-preview.tsx
│   ├── active-tasks.tsx
│   ├── create-task
│   │   ├── contract-input.tsx
│   │   ├── create-task.tsx
│   │   ├── execution-values.tsx
│   │   ├── function-input.tsx
│   │   ├── hooks
│   │   │   └── use-wizard.ts
│   │   ├── index.ts
│   │   ├── interval-input.tsx
│   │   ├── payment-input.tsx
│   │   ├── resolver-input.tsx
│   │   ├── restriction-info.tsx
│   │   └── task-name-input.tsx
│   ├── errors
│   │   └── validation-error.tsx
│   ├── index.tsx
│   ├── rename-task.tsx
│   └── task-view
│       ├── executing-address.tsx
│       ├── function-data.tsx
│       ├── index.ts
│       ├── input-values.tsx
│       ├── interval-values.tsx
│       ├── payment-info.tsx
│       ├── resolver-values.tsx
│       └── task-view.tsx
├── graphql
│   ├── codegen.ts
│   ├── graphql
│   │   └── generated
│   │       ├── gql.ts
│   │       ├── graphql.ts
│   │       └── index.ts
│   └── tasks.graphql
├── hooks
│   ├── index.ts
│   ├── use-abi.ts
│   ├── use-active-tasks.ts
│   ├── use-automate-sdk.ts
│   ├── use-cancel-task.ts
│   ├── use-is-automate-supported.ts
│   ├── use-msg-sender.ts
│   ├── use-new-task.ts
│   ├── use-rename-task.ts
│   ├── use-task-resolver.ts
│   └── use-task.ts
├── index.ts
├── README.md
├── utils
│   ├── constants.ts
│   ├── helpers.ts
│   ├── resolverDecoder.ts
│   └── types.ts
├── index.ts
└── README.md

```
