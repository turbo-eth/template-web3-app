# Tally Integration

This integration provides a DAO governance explorer powered by [Tally](https://www.tally.xyz).

## Features

- **DAO Discovery**: Browse and select from various DAOs
- **Proposals**: View all proposals with their status and voting results
- **Delegates**: Explore top delegates and their voting power

## Setup

1. Get a Tally API key from [Tally Developer Portal](https://www.tally.xyz/developers)
2. Add the following to your `.env.local`:
   ```
   NEXT_PUBLIC_TALLY_API_KEY=your_api_key_here
   ```

## Usage

```tsx
import { TallyDaoDashboard } from '@/integrations/tally/components/tally-dao-dashboard'

// Simple dashboard with default governor
<TallyDaoDashboard />

// Or with a specific DAO
<TallyDaoDashboard initialGovernorId="0x123..." />
```

## API

The integration provides the following hooks:

- `useGovernors()` - Fetch list of DAOs
- `useProposals(governorId)` - Fetch proposals for a DAO
- `useDelegates(governorId)` - Fetch delegates for a DAO
- `useDaoInfo(governorId)` - Fetch DAO information

## Demo

Visit `/tally` to see the demo.
