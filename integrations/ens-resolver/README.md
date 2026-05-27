# ENS Resolver Integration

Resolve Ethereum Name Service (ENS) names to addresses and vice versa using viem.

## Features

- Forward resolution: ENS name → Ethereum address
- Reverse resolution: Ethereum address → ENS name
- Avatar lookup for ENS names with set avatars
- Connected wallet awareness via wagmi

## Usage

```tsx
import { ENSLookup } from "@/integrations/ens-resolver/components/ens-lookup";

export default function Page() {
  return <ENSLookup />;
}
```

## Environment

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_MAINNET_RPC` | No | `https://eth.llamarpc.com` | Ethereum mainnet RPC URL |

## File Structure

```
integrations/ens-resolver
├─ api/
│  └─ ens-api.ts          # viem ENS resolution calls
├─ components/
│  └─ ens-lookup.tsx      # Lookup UI component
├─ hooks/
│  └─ use-ens-resolver.ts # React Query hook
├─ types.ts               # TypeScript types
└─ README.md              # This file
```

## Dependencies

- [viem](https://viem.sh) — Ethereum interaction library (already in template)
- [wagmi](https://wagmi.sh) — React hooks for Ethereum (already in template)
- [@tanstack/react-query](https://tanstack.com/query) — Data fetching (already in template)
