import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { publicLockV13Abi } from './abis/public-lock-v13-abi'
import { unlockV12Abi } from './abis/unlock-v12-abi'

export default defineConfig({
  out: 'integrations/unlock/generated/unlock-wagmi.ts',
  contracts: [
    {
      name: 'UnlockV12',
      abi: unlockV12Abi,
    },
    {
      name: 'PublicLockV13',
      abi: publicLockV13Abi,
    },
  ],
  plugins: [react()],
})
