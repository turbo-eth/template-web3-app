import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { YIELD_SOURCE_PRIZE_POOL_ABI } from './abis/yield-source-prize-pool-abi'
export default defineConfig({
  out: './pooltogether-v4-wagmi.ts',
  contracts: [
    {
      name: 'poolTogetherPrizePool',
      // @ts-ignore
      abi: YIELD_SOURCE_PRIZE_POOL_ABI,
    },
  ],
  plugins: [react()],
})
