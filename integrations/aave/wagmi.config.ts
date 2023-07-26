import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { erc20ABI } from './abis/erc20-abi'
import { uiPoolDataProvider } from './abis/ui-pool-data-provider-abi'

export default defineConfig({
  out: './generated/aave-wagmi.ts',
  contracts: [
    {
      name: 'ui-pool-data-provider',
      abi: uiPoolDataProvider,
    },
    {
      name: 'erc-20',
      abi: erc20ABI,
    },
  ],
  plugins: [react()],
})
