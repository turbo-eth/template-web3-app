import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { erc20ABI } from './abis/erc20-abi'
import { erc20MintableABI } from './abis/erc20-mintable-abi'

export default defineConfig({
  out: './integrations/erc20-wagmi.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20ABI,
    },
    {
      name: 'erc20Mintable',
      abi: erc20MintableABI,
    },
  ],
  plugins: [react()],
})
