import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { erc721ABI } from './abis/erc721-abi'

export default defineConfig({
  out: './integrations/erc721-wagmi.ts',
  contracts: [
    {
      name: 'erc721',
      abi: erc721ABI,
    },
  ],
  plugins: [react()],
})
