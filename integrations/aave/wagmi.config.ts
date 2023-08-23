import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { poolAbi } from './abis/pool-abi'
import { uiPoolDataProvider } from './abis/ui-pool-data-provider-abi'

export default defineConfig({
  out: './generated/aave-wagmi.ts',
  contracts: [
    {
      name: 'ui-pool-data-provider',
      abi: uiPoolDataProvider,
    },
    {
      name: 'pool',
      abi: poolAbi,
    },
  ],
  plugins: [react()],
})
