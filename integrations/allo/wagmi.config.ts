import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { alloABI, registryABI } from './abis'

export default defineConfig({
  out: './integrations/allo/generated/allo-wagmi.ts',
  contracts: [
    {
      name: 'allo',
      abi: alloABI,
    },
    {
      name: 'registry',
      abi: registryABI,
    },
  ],
  plugins: [react()],
})
