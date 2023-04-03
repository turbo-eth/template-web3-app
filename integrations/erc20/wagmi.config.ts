import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { erc20ABI } from './abis/erc20ABI'
import { erc20MintableABI } from './abis/erc20MintableABI'

export default defineConfig({
  out: './erc20-wagmi.ts',
  contracts: [
    {
      name: 'erc20',
      // @ts-ignore
      abi: erc20ABI,
    },
    {
      name: 'erc20Mintable',
      // @ts-ignore
      abi: erc20MintableABI,
    },
  ],
  plugins: [react()],
})
