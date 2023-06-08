import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { yieldSourcePrizePoolABI } from './abis/yield-source-prize-pool-abi'
export default defineConfig({
  out: './integrations/pooltogether-v4/pooltogether-v4-wagmi.ts',
  contracts: [
    {
      name: 'poolTogetherPrizePool',
      abi: yieldSourcePrizePoolABI,
    },
  ],
  plugins: [react()],
})
